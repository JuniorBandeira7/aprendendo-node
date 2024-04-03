const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer.prompt([{
    name: 'nome',
    message: "Qual seu nome?"
},{
    name: 'idade',
    message: "Qual sua idade?"
}]).then((answers)=>{
    console.log(chalk.black.bgYellow(`Seu nome é ${answers.nome} e sua idade ${answers.idade}`))
}).catch(err => console.log(err))
