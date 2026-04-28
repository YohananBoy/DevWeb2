//Importar métodos de notasFunc
import { obterMedia, obterGrau, validaALuno, limparElementos } from "./notasFunc.js";
//Recuperar o form e o span de erro
const formAluno = document.querySelector("form");
const inputNome = document.querySelector("#nome");
const inputNota1 = document.querySelector("#nota1");
const inputNota2 = document.querySelector("#nota2");
//registrar o evento (addEventListener) submit do form
formAluno.addEventListener("submit", e => {
    //*******Dentro de addEventListener */
    //evitar o comportamento padrão do submit
    e.preventDefault();
    //limpar os elementos de exibição 
    limparElementos(document.querySelectorAll("span"));
    //montar um objeto aluno a partir dos inputs
    let aluno = {
        nome: inputNome.value,
        nota1: Number(inputNota1.value),
        nota2: Number(inputNota2.value)
    };
    //validar aluno e exibir mensagem de erro por 3 segundos e sair se tiver erro
    let msgErro = validaALuno(aluno);
    if (msgErro) {
        document.querySelector("#erro").textContent = msgErro
        setTimeout(() => {
            document.querySelector("#erro").textContent = '';
        }, 3000);
        return;
    }
    //obter aluno.media e aluno.grau
    aluno.media = obterMedia(aluno.nota1, aluno.nota2);
    aluno.grau = obterGrau(aluno.media);
    //exibir dados do objeto aluno com o resultado
    exibirDados(aluno);
    //*******Dentro de addEventListener */
})
//Fim do addEventListener


//Função já pronta exibirDados
function exibirDados({ nome, media, grau }) {
    limparElementos(document.querySelectorAll("span"));
    document.querySelector('#dados').textContent = "Dados do aluno";
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`;
    document.querySelector('#alunoMedia').textContent = `Média: ${media.toFixed(2)}`;
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`;
}