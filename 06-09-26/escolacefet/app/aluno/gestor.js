import { limpaElementos, exibeErro, limpaForm } from "../js/util.js";
import { spanErro, formAluno, tabela, preencheDados, valida, preencheTabela, preencherForm } from "./util.js";
import { insere, lista, obterPeloId, remove, altera } from "./api.js";

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector("#btnEnviar").value = "Calcular e inserir";
    //Requisição para listar
    try {
        let dados = await lista();
        preencheTabela(dados);
    } catch (erro) {
        exibeErro(spanErro, erro.message, 3000);
    }
})

formAluno.addEventListener('submit', async e => {
    e.preventDefault();
    limpaElementos('.info');
    //montar um objeto aluno a partir dos inputs
    let aluno = {
        nome: document.querySelector('#nome').value.trim(),
        nota1: Number(document.querySelector('#nota1').value),
        nota2: Number(document.querySelector('#nota2').value)
    }
    //Tratamento de erros
    let msgErro = valida(aluno);
    if (msgErro) {
        exibeErro(spanErro, msgErro, 3000);
        return; //Interrompe
    }
    //Requisição para inserir ou alterar
    aluno.id = (document.querySelector("#id").value) ? document.querySelector("#id").value : 0;
    try {
        let dados = null;
        if(aluno.id <= 0) 
            dados = await insere(aluno);
        else {
            dados = await altera(aluno);
            document.querySelector('#btnEnviar').value = "Calcula e insere";
            document.querySelector('#id').value = 0;
        }
        preencheDados(dados);
        limpaForm(formAluno);
        setTimeout(() => {
            limpaElementos('.info')
        }, 3000);
        let alunos = await lista();
        preencheTabela(alunos);
    } catch (erro) {
        exibeErro(spanErro, erro.message, 3000);
    }
})

tabela.addEventListener("click", async e => {
    const elemento = e.target
    if(elemento.tagName === 'BUTTON') {
        if(elemento.textContent === '[EDITAR]') {
            try {
                let aluno = await obterPeloId(elemento.dataset.id);
                preencherForm(aluno);
            }
            catch(erro) {
                exibeErro(spanErro,erro.message, 3000);
            }
        }
        if(elemento.textContent === '[EXCLUIR]')
            if(confirm('Deseja realmente remover o registro de id' + elemento.dataset.id + '?')) {
                try {
                    await remove(elemento.dataset.id);
                    let alunos = await lista();
                    preencheTabela(alunos);
                }catch(erro) {
                    exibeErro(spanErro, erro.message, 3000);
                }
            }
    }
})
