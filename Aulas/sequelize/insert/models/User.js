const {DataTypes} = require('sequelize')

db = require('../db/conn')


//aqui estou definindo os campos da tabela usuario
const User = db.define('user', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation:{
        type: DataTypes.STRING,
        //esse campo não pode ser vazio, nem nulo
        required: true
    },
    newsletter:{
        type: DataTypes.BOOLEAN
    }
})

module.exports = User
