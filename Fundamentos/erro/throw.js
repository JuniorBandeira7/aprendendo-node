
const x = "10"

// checar se x é numb

if(!Number.isInteger(x)){
    throw new Error('O valor de x não é um inteiro!')
}
//caso nao for encerra o programa e da um erro

console.log("Continuando oo codigo...")