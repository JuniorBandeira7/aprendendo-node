const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// helpers

const createUserToken = require('../helpers/create-user-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController{
    static async register(req, res){
        const {name, email, phone, password, confirmpassword} = req.body

        // validações
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({message: 'a senha é obrigatória'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'a confirmação de senha é obrigatória'})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha devem ser iguais'})
            return
        }

        // check if user exists
        const userExists = await User.findOne({email: email})

        if(userExists){
            res.status(422).json({message: 'Email já cadastrado'})
            return
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async login(req, res) {
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: 'Digite o email'})
            return
        }

        if(!password){
            res.status(422).json({message: 'Digite a senha'})
            return
        }

        // check if user exists
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'Email não encontrado no sistema'})
            return
        }

        //check if password match
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: 'Senha não corresponde com o email'})
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            // verifica o token do usuario
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            // busca os dados do usuario no bd
            currentUser = await User.findById(decoded.id)

            // pega os dados do usuario menos a senha
            currentUser.password = undefined
        }else{
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json({user})
    }

    static async editUser(req, res){
        const id = req.params.id

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, phone, password, confirmpassword} = req.body

        let image = ''

        if(req.file){
            user.image = req.file.filename
        }

        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        user.name = name

        if(!email){
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }

        user.email = email

        const userExists = await User.findOne({email: email})

        if(user.email !== email && userExists){
            res.status(422).json({message: 'Email já cadastrado, utilize outro'})
            return
        }

        user.email = email

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório'})
            return
        }

        user.phone = phone

        if(password != confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha devem ser iguais'})
            return
        }else if(password === confirmpassword && password != null){

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }
        try {
            await User.findByIdAndUpdate({_id: user._id},
                {$set: user},
                {new: true}
            )

            res.status(200).json({
                message: 'Dados atualizados'
            })
        } catch (error) {
            res.status(500).json({message: error})
            return
        }

    }
}