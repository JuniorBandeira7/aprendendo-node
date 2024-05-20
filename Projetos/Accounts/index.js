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
        } else if(action === 'Depositar'){
            
            deposit()
        } else if(action === 'Sacar'){

            withdraw()
        }else if(action === 'Consultar Saldo'){

            getAccountBalance()
        }else if(action === 'Sair'){

            console.log(chalk.bgBlue.black('Obrigado por usar o accounts!'))
            process.exit()
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

function deposit(){

    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da conta?'
    }]).then((answer) => {
        
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return deposit()
        }  

        inquirer.prompt([{
            name:'amount',
            message:'Quanto você deseja depositar?'
        }]).then((answer)=>{

            const amount = answer['amount']
            const accountData = getAccount(accountName)
            if(!amount){

                console.log('Ocorreu um erro, tente novamente')
                return deposit()
            }

            accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
            fs.writeFileSync(
                `accounts/${accountName}.json`,
                JSON.stringify(accountData),
                function(err){
                    console.log(err)
                }
            )

            console.log(chalk.green(`Foi depositado o valor de R$${amount}`))
            operation()
        })
    }).catch(err => console.log(err))
}
function checkAccount(accountName){
    
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe'))
        return false
    }
    return true
}

function getAccount(accountName){

    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJson)
}

function getAccountBalance(){
    inquirer.prompt([{
        name: 'accountName',
        message:'Qual o nome da sua conta?'
    }]).then((answer)=>{

        const accountName = answer["accountName"]

        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(
            `O saldo da sua conta é R$${accountData.balance}`
        ))
        operation()
    }).catch(err => console.log(err))
}

function withdraw(){

    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta?'
    }]).then((answer)=>{

        const accountName = answer["accountName"]

        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([{
            name:'amount',
            message:'Quanto voce deseja sacar?'
        }]).then((answer) => {

            const amount = answer['amount']
            const accountData = getAccount(accountName)
            
            if(!amount){

                console.log(chalk.bgRed('Ocorreu um erro, tente novamente'))
                return withdraw()
            }

            if(accountData.balance < amount){

                console.log(chalk.bgRed('Valor indisponivel'))
                return withdraw()
            }

            accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

            fs.writeFileSync(               
                `accounts/${accountName}.json`,
                JSON.stringify(accountData),
                function(err){
                    console.log(err)
                }
            )

            console.log(chalk.green(`Foi realiazdo um saque de R$${amount}`))
            
            operation()
        }).catch((err) => console.log(err))
    }).catch(err => console.log(err))
}