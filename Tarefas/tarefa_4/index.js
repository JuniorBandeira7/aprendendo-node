const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) =>{
    const doces = [
        {
            name:"jujuba",
            preco: 1
        },
        {
            name:"paçoca",
            preco: 50
        }
    ]

    res.render('home', {doces : doces})
})

app.listen(3000, ()=>{
    console.log('app rodando na rota 3000')
})