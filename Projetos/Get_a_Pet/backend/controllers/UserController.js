const User = require('../models/User')

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
    }
}