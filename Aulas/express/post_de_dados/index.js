const express = require('express')
const app = express()
const port = 3000 // variável ambiente
const path = require('path')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

const checkAuth = function(req, res, next){

    req.authStatus = true

    if(req.authStatus){
        console.log("logado")
        next()
    } else{
        console.log("nao logado")
        next()
    }
}

app.use(checkAuth)

app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () =>{
    console.log(`App rodando na porta ${port}`)
})

app.get('/users/add', (req, res)=>{
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) =>{

    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuario é ${name} e ele tem ${age} anos`)

    res.sendFile(`${basePath}/userform.html`)
})