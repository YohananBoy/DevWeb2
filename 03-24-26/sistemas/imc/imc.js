//Importar métodos de imcFunc
import { obterImc, obterClassificacao, validaPessoa, limparElementos } from "./imcFunc.js";
//Recuperar o botão enviar e o span de erro
const btnEnviar = document.querySelector("#btnEnviar");
const spanErro = document.querySelector("#erro");
//Registrar (addEventListener) o evento click do botão 
btnEnviar.addEventListener("click", e => {
    //*******Dentro de addEventListener */
    //Limpar os elementos de exibição
    limparElementos(document.querySelectorAll("span"));
    //Montar um objeto pessoa a partir dos inputs
    let pessoa = {
        peso: document.querySelector("#peso").value,
        altura: document.querySelector("#altura").value
    };
    //validar pessoa e exibir mensagem de erro por 3 segundos e sair se tiver erro
    let msgErro = validaPessoa(pessoa);
    if (msgErro) {
        spanErro.textContent = msgErro;
        setTimeout(() => {
            spanErro.textContent = ""
        }, 3000);
        return;
    }
    //obter pessoa.imc e pessoa.classificacao
    pessoa.imc = obterImc(pessoa);
    pessoa.classificacao = obterClassificacao(pessoa.imc);
    //exibir dados da pessoa com o resultado
    exibirDados(pessoa)
    //*******Dentro de addEventListener */
})

//Fim do addEventListener

//Função já pronta exibirDados
function exibirDados({imc, classificacao }) {
    limparElementos(document.querySelectorAll("span"));
    document.querySelector('#dados').textContent = "Dados do pessoa";
    document.querySelector('#pessoaImc').textContent = `Grau: ${imc.toFixed(2)}`;
    document.querySelector('#pessoaClassificacao').textContent = `Classificação: ${classificacao}`;
}