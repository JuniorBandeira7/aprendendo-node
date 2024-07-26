const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Rotas - endpoints
app.post('/createproduct', (req, res)=>{
    const name = req.body.name
    const price = req.body.price

    if(!name){
        res.status(422).json({message: 'O nome é obrigatorio'})
        return
    }

    console.log(name)
    console.log(price)

    res.status(201).json({message: `Porduto ${name}, preço ${price}`})
})

app.get('/', (req, res)=>{
    res.status(200).json({message: 'Hello World!'})
})


app.listen(3000)