const paises = ['frança', 'uzbequistao', 'groelandia',
    'paquistao', 'angola', 'baren',
    'cabo verde', 'islandia', 'honduras'];

function buscaPaises(paises, pais) {
    for (let i = 0; i < paises.length; i++) {
        if (pais === paises[i]) {
            console.log(`O país ${paises[i]} foi localizado!`);
            return;
        }
    }
    console.log('País inexistente!');
}

buscaPaises(paises, 'frança');
