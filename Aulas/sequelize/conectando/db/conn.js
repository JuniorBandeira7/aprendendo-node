const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('conectado')
}catch(err){
    console.log('não conectou', err)
}

module.exports = sequelize