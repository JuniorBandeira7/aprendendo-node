const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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



app.get('/', (req, res)=>{
    res.render('home')
})

app.post('/books/insertbook', (req, res)=>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pageqty', title, pageqty]

    pool.query(sql, data, function(err){
        if(err){
            console.log(err)
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res)=>{
    const sql = "SELECT * FROM books"

    pool.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books', {books})
    })
})

app.get('/book/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', {book})
    })
})

app.get('/book/edit/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('editbook', {book})
    })
})

app.post('/book/updatebook', (req, res)=>{
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE ?? SET ?? = ?, ?? = ? WHERE id = ?`

    const data = ['books', 'title', title, 'pageqty', pageqty, id]

    pool.query(sql, data, function(err){
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.post('/book/remove/:id', (req, res)=>{
    const id = req.params.id

    const sql = `DELETE FROM ?? WHERE ?? = ?`

    const data = ['books', 'id', id]

    pool.query(sql, data, function(err){
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.listen(3000)