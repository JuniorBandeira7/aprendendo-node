const chalk = require("chalk")
const inquirer = require("inquirer")
const fs = require("fs")

operation()

function operation(){
    inquirer.prompt([{
       type: 'list',
       name: 'action',
       message: 'o que vc deseja fazer?',
       choices: ['Criar conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair'], 
    }]).then((answer) => {

        const action = answer['action']

        if(action === 'Criar conta'){
            createAccount()
        }

    }).catch((err) => console.log(err))
}

function createAccount(){
    console.log(chalk.bgGreen.black('Seja bem vindo(a)'))
    console.log(chalk.green('Defina as opções da conta a seguir'))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{

        name: 'accountName',
        message: 'Digite um nome para sua conta',

    }]).then((answer) =>{

        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
            console.log(err)
        })
        console.log(chalk.green('Parabens pela conta nova'))
        operation()
    
    }).catch((err) => console.log(err))
}