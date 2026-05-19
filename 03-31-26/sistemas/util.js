//função (limparElementos) para limpar o textContent de elementos a partir de uma classe
export function limparElementos(elementos) {
    elementos.forEach(elemento => {
        elemento.textContext = "";
    });
}

export function exibirErro(elementoDOM, msg, tempo) {
    elementoDOM.textContext = msg;
    setTimeout(() => {
        elementoDOM.textContext = "";
    }, tempo);
}