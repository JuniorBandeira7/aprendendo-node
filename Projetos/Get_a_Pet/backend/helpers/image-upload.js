const { error } = require('console')
const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ""

        if(req.baseUrl.includes('users')){
            folder = "users"
        }else if(req.baseUrl.includes('pets')){
            folder = "pets"
        }
        
        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random()*1000)) + path.extname(file.originalname))// String(Math.floor(Math.random()*1000)) garante que o nome das fotos nao sejam repitidos
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Formatos suportados: jpg e png"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}