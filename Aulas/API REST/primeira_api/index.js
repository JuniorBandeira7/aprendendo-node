const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Rotas - endpoints
app.get('/', (req, res)=>{
    res.json({message: 'Hello World!'})
})

app.listen(3000)