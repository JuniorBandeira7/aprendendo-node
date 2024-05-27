express = require('express')
const app = express()
path = require('path')
const port = 5000
const paginas = require('./paginas')

//arquivos estáticos
app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

//importar router
app.use('/paginas', paginas)

app.get('/', (req, res)=>{

    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
})