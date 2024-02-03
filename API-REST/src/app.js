import express from 'express'
const app = express()
//indicar para o express ler body com json
app.use(express.json())

// mock
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'argentina', grupo: 'G'},
    {id: 3, selecao: 'servia', grupo: 'G'},
    {id: 4, selecao: 'holanda', grupo: 'G'}
] 


// criar rota padrão ou raiz
app.get('/', (req, res) =>{// ver o que é rota no gpt
    res.send('Hello, world!')
})

app.get('/selecoes', (req, res) => {
    res.status(200).send(selecoes)
})

app.post('/selecoes', (req, res) =>{
    selecoes.push(req.body)
    res.status(201).send('selecao cadastrada')
})

export default app
