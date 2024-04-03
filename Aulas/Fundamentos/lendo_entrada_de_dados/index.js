const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})
readline.question("Qual sua liguagem de prog", (language) =>{
    console
    .log(`A minha linguagem favorita é: ${language}`)
    readline.close()
})