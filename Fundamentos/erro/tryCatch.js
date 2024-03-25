const x = 10

try{
    x = 2
    //vai dar erro pois não é possivel mudar valor de constantes
    //usando o tryCatch o programa não é encerrado
}catch(err){
    console.log(`Erro: ${err}`)
}