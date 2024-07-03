const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const doces = [
    {
        id: '1',
        name: 'jujuba',
        preco: 1
    },
    {
        id: '2',
        name: 'paçoca',
        preco: 50
    }
]

app.get('/doce/:id', (req, res)=>{
    const doce = doces[parseInt(req.params.id) - 1]

    res.render('doce' , {doce})
})


app.get('/', (req, res) =>{

    res.render('home', {doces})
})

app.listen(3000, ()=>{
    console.log('app rodando na rota 3000')
    
})