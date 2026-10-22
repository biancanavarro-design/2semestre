let numeros = [10, 20, 30, 40];


let primeiro = numeros[0];


numeros[0] = numeros[numeros.length - 1];
numeros[numeros.length - 1] = primeiro;


console.log(numeros);
