const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)  

app.use(express.json())

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.post('/users/create', async (req, res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    //se um checkbox está checkado ele vem com um 'on'
    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    console.log(req.body)
    //esse await ele espera a criação do usuario(os dados serem confirmados no db) antes de executar o resto do codigo
    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.get('/users/create', (req, res)=>{
    res.render('adduser')
})

app.get('/users/:id', async (req, res)=>{
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id : id}})

    res.render('userview', {user})
})

app.post('/users/delete/:id', async (req, res)=>{
    const id = req.params.id

    await User.destroy({where:{id: id}})

    res.redirect('/')
})

app.get('/users/edit/:id',  async (req, res)=>{
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render('useredit', {user})
})

app.post('/users/update', async (req, res)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    const userData ={
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, {where: {id: id}})

    res.redirect('/')
})

app.get('/', async (req, res)=>{
    // utilizando o raw como parametro eu chamo apenas os dados da tabela
    const users = await User.findAll({raw: true})

    //console.log(users)

    res.render('home', {users: users})
})




conn.
sync().
//sync({force: true}).//serve para forçar a criação das tabelas, as excluindo e criando de novo.
then(()=>{
    app.listen(3000)
}).
catch(err => console.log(err))