const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/dashboard', (req, res)=>{

    const items = ["item a", "item b", "item c"]

    res.render('dashboard', {items})
})

app.get('/post', (req, res)=>{
    const post ={
        title: 'aprender node',
        category: 'js',
        body: 'este artigo vai te ajudar a aprender node',
        comments: 4,
    }

    res.render('blogpost', {post})
})

app.get('/blog', (req, res)=>{
    const posts = [
        {
            title: 'Aprender node',
            category: 'js',
            body: 'este artigo vai te ajudar a aprender node',
            comments: 4  
        },
        {
            title: 'Aprender php',
            category: 'php',
            body: 'este artigo vai te ajudar a aprender php',
            comments: 4
        },
        {
        title: 'Aprender python',
        category: 'python',
        body: 'este artigo vai te ajudar a aprender python',
        comments: 4
        }
    ]

    res.render("blog", { posts })
})

app.get('/', (req, res) =>{

    const user ={
        name: "julio",
        username:"bandeira",
    }

    const auth = true

    const approved = false

    res.render('home', {user: user, auth, approved})
})

app.listen(3000, ()=>{
    console.log('app rodando')
})