//Função para obter media
function obterMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}
//Função para obter Grau
function obterGrau(media) {
    if (media > 8) return "A";
    else if (media > 6) return "B";
    else if (media > 4) return "C";
    else if (media > 2) return "D";
    else return "E";
}
//Função para validar um aluno
function validaALuno({ nome, nota1, nota2 }) {
    if (!nome || nome == "") return "Nome invalido";
    if (Number.isNaN(nota1) || Number.isNaN(nota2)) return "Notas precisam ter um valor numérico";
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) return "Notas precisam estar entre 0 e 10";
    return null;
}
//função (limparElementos) para limpar o textContent de elementos a partir de uma classe
function limparElementos(elementos) {
    elementos.forEach(elemento => {
        elemento.textContext = "";
    });
}
//exportar as funções
export { obterMedia, obterGrau, validaALuno, limparElementos };