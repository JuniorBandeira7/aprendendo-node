const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res)=>{
    //create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")// "nossosecret" é um secret, tipo uma senha, tem que ser algo dificil de quebrar

    //return token
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })
}
module.exports = createUserToken