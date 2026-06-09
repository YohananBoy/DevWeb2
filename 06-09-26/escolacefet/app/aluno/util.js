const formAluno = document.querySelector('form');
const spanErro = document.querySelector('#erro');
const tabela = document.querySelector('#tblAluno tbody');

//Criar as funções valida, preencheDados
function preencheDados({nome, media, grau}){
    document.querySelector('#dados').textContent = "Dados do aluno";
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`;
    document.querySelector('#alunoMedia').textContent = `Média: ${media}`;
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`;
}
function valida({nome, nota1, nota2}){
    if(!nome) return "Preencha o nome.";
    if( Number.isNaN(nota1) || Number.isNaN(nota2) )
        return "Notas precisam conter valores numéricos";
    /*if( nota1<0 || nota1>10 || nota2<0 || nota2>10 )
        return "As notas devem estar entre 0 e 10.";*/
    return null;
}
function preencheTabela(alunos) {
    while(tabela.firstChild)
        tabela.removeChild(tabela.firstChild);

    alunos.forEach(aluno => {
        const {id, nome, nota1, nota2, media, grau} = aluno;
        const tr = document.createElement('tr');
        const [tdId, tdNome, tdNota1, tdNota2, tdMedia, tdGrau, tdAcoes] = ['td','td','td','td','td','td','td'].map(item => document.createElement(item));
        tdId.textContent = id;
        tdNome.textContent = nome;
        tdNota1.textContent = nota1;
        tdNota2.textContent = nota2;
        tdMedia.textContent = media;
        tdGrau.textContent = grau;
    
        const btnEditar = document.createElement('button');
        const btnExcluir = document.createElement('button');
        btnEditar.textContent = "[EDITAR]";
        btnExcluir.textContent = "[EXCLUIR]";
        btnEditar.dataset.id = id;
        btnExcluir.dataset.id = id;
        tdAcoes.append(btnEditar,btnExcluir);
        tr.append(tdId,tdNome,tdNota1,tdNota2,tdMedia,tdGrau,tdAcoes);
        tabela.append(tr);
    })
}

function preencherForm({id, nome, nota1, nota2}) {
    formAluno.id.value = id;
    formAluno.nome.value = nome;
    formAluno.nota1.value = nota1;
    formAluno.nota2.value = nota2;
    formAluno.btnEnviar.value = "Calcular e Alterar";
}

export { valida, preencheDados, preencheTabela, preencherForm, spanErro, formAluno, tabela }
