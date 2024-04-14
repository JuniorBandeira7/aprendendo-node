const fs = require("fs")

if(!fs.existsSync('./minhapasta')){
    console.log("nao existe")
    //cria a pasta
    fs.mkdirSync('minhapasta')
}
if(fs.existsSync('./minhapasta')){
    console.log("existe")
}