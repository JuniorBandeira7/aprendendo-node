const chalk = require('chalk')

const nota = 6



if (nota >= 7){
    console.log(chalk.green.bold('Parabens vc esta aprovado!'))
} else {
    console.log(chalk.green.bgRed('Recuperação'))
}