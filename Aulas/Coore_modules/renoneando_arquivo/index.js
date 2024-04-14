const fs = require("fs")


fs.rename("arquivo.txt", "novo.txt", function(err){
    if(err){
        console.log(err)
        return
    }
    console.log("nome atualizado")
})