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

function buscarSelecaoPorId(id){
    return selecoes.filter(selecao => selecao.id == id)
}
//pegar a posicao ou index do elemento no array por id
function buscarIndexSelecao(id){
    return selecoes.findIndex(selecao => selecao.id == id)
}

app.get('/selecoes/:id', (req, res) => {
    res.json(buscarSelecaoPorId(req.params.id))
})

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

app.delete('/selecoes/:id', (req,res) =>{
    let index = buscarIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`selecao id: ${req.params.id} excluida`)
})

app.put('/selecoes/:id', (req,res) =>{
    let index = buscarIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo = req.body.grupo
    res.json(selecoes)
})

export default app
