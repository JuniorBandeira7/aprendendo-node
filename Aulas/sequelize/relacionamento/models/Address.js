const {DataTypes} = require('sequelize')

db = require('../db/conn')

const User = require('./User')


//aqui estou definindo os campos da tabela usuario
const Address = db.define('address', {
    street:{
        type: DataTypes.STRING,
        required: true
    },
    number:{
        type: DataTypes.STRING
        //esse campo não pode ser vazio, nem nulo
    },
    city:{
        type: DataTypes.STRING,
        required: true
    }
})

Address.belongsTo(User)

module.exports = Address
