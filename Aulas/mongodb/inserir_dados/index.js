const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const productsRoutes = require('./routes/productsRoutes')

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})


app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static('public'))

app.use('/products', productsRoutes)

app.listen(3000)