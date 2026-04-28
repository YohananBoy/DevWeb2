//Declare as funções com o prefixo export
//Função para obter o imc ( peso / altura²)
export function obterImc({peso, altura}) {
    return peso/(altura*altura);
}
//Função para obter a classificação a partir do IMC
export function obterClassificacao(imc) {
    if(imc < 18.5) return "Abaixo do peso normal";
    else if(imc < 24.9) return "Peso normal";
    else if(imc < 29.9) return "Acima do peso";
    else if(imc < 34.9) return "Obesidade classe I";
    else if(imc < 39.9) return "Obesidade classe II";
    else return "Obesidade classe III";
}
//Função para validar uma pessoa
export function validaPessoa({peso, altura}) {
    if(!peso || !altura) return "Preencha os campos";
    if(Number.isNaN(peso) || Number.isNaN(altura)) return "Preencha os campos com números";
    if(peso < 2 || peso > 500 || altura < 0.1 || altura > 5) return "Preencha os campos com números válidos";
    return null;
}