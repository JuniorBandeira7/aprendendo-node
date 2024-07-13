const {DataTypes} = require('sequelize')

db = require('../db/conn')

const User = require('./User')



const Address = db.define('address', {
    street:{
        type: DataTypes.STRING,
        required: true
    },
    number:{
        type: DataTypes.STRING
        
    },
    city:{
        type: DataTypes.STRING,
        required: true
    }
})
User.hasMany(Address)
//linka essa tabela com a tabela user e cria uma chave estrangeiras que é a id da tabela user
Address.belongsTo(User)

module.exports = Address
