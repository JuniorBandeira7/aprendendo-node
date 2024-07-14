const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    console.log('conectado')
}catch(error){
    console.log(`Erro: ${error}`)
}

exports.default = sequelize