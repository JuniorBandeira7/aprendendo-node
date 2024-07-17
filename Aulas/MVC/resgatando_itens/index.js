const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const Task = require('./models/task')

const taskRoutes = require('./routes/tasksRoutes')

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tasks', taskRoutes)

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=> console.log(err))