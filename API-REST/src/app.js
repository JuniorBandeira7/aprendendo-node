import express from 'express'
import conexao from '../infra/conexao.js'
const app = express()
//indicar para o express ler body com json
app.use(express.json())

function buscarSelecaoPorId(id){
    return selecoes.filter(selecao => selecao.id == id)
}
//pegar a posicao ou index do elemento no array por id
function buscarIndexSelecao(id){
    return selecoes.findIndex(selecao => selecao.id == id)
}

//Rotas
app.get('/selecoes', (req, res) => {
    //res.status(200).send(selecoes)
    const sql = "SELECT * FROM nodeaprendendo.selecoes;"
    conexao.query(sql, (error, result)=>{
        if(error){
            console.log(error)
            res.status(404).json({'error' : error})
        }else{
            res.status(200).json(result)
        }
    })
})

app.get('/selecoes/:id', (req, res) =>{
    const id = req.params.id
    const sql = "SELECT * FROM nodeaprendendo.selecoes WHERE id=?;"
    conexao.query(sql, id, (error, result)=>{
        const linha = result[0]
        if(error){
            console.log(error)
            res.status(404).json({'error' : error})
        }else{
            res.status(200).json(linha)
        }
    })
})

app.post('/selecoes', (req, res) =>{
    const selecao = req.body
    const sql = "insert into nodeaprendendo.selecoes set ?;"
    conexao.query(sql, selecao, (error, result)=>{
        if(error){
            console.log(error)
            res.status(400).json({'error' : error})
        }else{
            res.status(201).json(result)
        }
    })
})

app.delete('/selecoes/:id', (req,res) =>{
    const id = req.params.id
    const sql = "delete FROM nodeaprendendo.selecoes WHERE id=?;"
    conexao.query(sql, id, (error, result)=>{
        if(error){
            console.log(error)
            res.status(404).json({'error' : error})
        }else{
            res.status(200).json(result)
        }
    })
})

app.put('/selecoes/:id', (req,res) =>{
    const id = req.params.id
    const selecao = req.body
    const sql = "update nodeaprendendo.selecoes set ? where id = ?;"
    conexao.query(sql, [selecao, id], (error, result)=>{
        if(error){
            console.log(error)
            res.status(400).json({'error' : error})
        }else{
            res.status(200).json(result)
        }
    })
})

export default app
