const nomes = ["Ana", "João", "Maria", "Pedro", "Carlos"];

function buscaNome(nomes, nomeProcurado) {
    for (let i = 0; i < nomes.length; i++) {
        if (nomeProcurado == nomes[i]) {
            return true;
        }
    }
    return false;
}

//ex03
const notas = [7, 10, 8, 10, 9, 10, 6, 10];

function contaNotaMaxima(notas) {
    let contador = 0;

    for (let i = 0; i < notas.length; i++) {
        if (notas[i] == 10) {
            contador++;
        }
    }
    return contador;
}

console.log(contaNotaMaxima(notas));