const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})


app.engine('handlebars', hbs.engine)
app.set('viwe engine', 'handlebars')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.listen(3000)