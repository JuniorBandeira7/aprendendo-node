const getToken = require('../helpers/get-token')
const Pet = require('../models/Pet')
const getUserByToken = require('../helpers/get-user-by-token')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId


module.exports = class PetController{
    // create a pet
    static async create(req, res){
        const {name, age, weight, color} = req.body

        const images = req.files
 
        const available = true

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }
        if(!age){
            res.status(422).json({message: 'A idade é obrigatório'})
            return
        }
        if(!weight){
            res.status(422).json({message: 'O peso é obrigatório'})
            return
        }
        if(!color){
            res.status(422).json({message: 'a cor é obrigatória'})
            return
        }
        if(images.length === 0){
            res.status(422).json({message: 'a imagem é obrigatória'})
            return
        }

        const pet = new Pet({
            name, age, weight, color, available, images: [], user:{
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image)=>{
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()

            res.status(201).json({message: 'Pet cadastrastado com sucesso!', newPet})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getAll(req, res){
        const pets = await Pet.find().sort("-createAt")

        res.status(200).json({
            pets: pets,
        })
    }

    static async getAllUserPets(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-creatAt')

        res.status(200).json({
            pets
        })
    }
    static async getAllUserAdoption(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id': user._id}).sort('-creatAt')

        res.status(200).json({
            pets
        })
    }

    static async getPetById(req, res){
        const id = req.params.id

        if (!ObjectId.isValid(id)){
            res.status(422).json({message: 'ID inválido!'})
            return
        }
        
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
        }

        res.status(200).json({
            pet: pet
        })
    }

    static async removePetById(req, res){

        const id = req.params.id

        if (!ObjectId.isValid(id)){
            res.status(422).json({message: 'ID inválido!'})
            return
        }
        
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString()  !== user._id.toString()){
            res.status(422).json({message: 'Houve um problema!'})
            return
        }

        await  Pet.findByIdAndDelete(id)

        res.status(200).json({message: 'Pet removido!'})
    }
}