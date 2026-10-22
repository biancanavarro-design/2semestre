const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function buscaNumero(numeros, num) {
    for (let i = 0; i < numeros.length; i++) {
        if (num == numeros[i]) {
            console.log(`O numero ${numeros[i]} foi localizado na posição ${i + 1}!`);
            return;
        }
    }
    console.log('-1');
}

buscaNumero(numeros, 9);
buscaNumero(numeros, 11);