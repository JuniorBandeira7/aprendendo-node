const fs = require("fs")

console.log("inicio")

// por ser assincrono o node deixa para executar essa função por ultimo, mesmo ela entand antes de algo
fs.writeFile("arquivo.txt", "oi", function(err){
    setTimeout(function(){
        console.log("arquiv criado")
    }, 1000)
})

console.log("fim")