import app from './SRC/app.js'


const PORT = 3000

//escutar a porta  3000
app.listen(PORT, () =>{
    console.log(`endereço: http://localhost:${PORT}`)
})

