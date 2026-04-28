//pegando as parada do html
const formMedia = document.getElementById("formMedia")
const btnEnviar = document.getElementById("btnEnviar")
const dados = document.getElementById("dados")
const alunoNome = document.getElementById("alunoNome")
const alunoMedia = document.getElementById("alunoMedia")
const alunoGrau = document.getElementById("alunoGrau")
const spanErro = document.getElementById("spanErro")

//pegando as parada do form
formMedia.addEventListener("submit", async e => {
    e.preventDefault()

    const aluno = {
        nome: document.getElementById("nome").value,
        nota1: document.getElementById("nota1").value,
        nota2: document.getElementById("nota2").value
    }

    let msgErro = validar(aluno)
    if (msgErro) {
        spanErro.textContent = msgErro
        setTimeout(() => {
            spanErro.textContent = ""
        }, 3000);
    }

    try{
        //e enviano po php
        let resp = await fetch('processaAluno.php',
            {
                method: 'POST',
                body: JSON.stringify(aluno),
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            }
        )
        console.log(resp)
        try{
            dados = await resp.json()
        }
        catch{
            //num deu pa virar json
        }
        //se num ta ok envia os erro
        if(!resp.ok) {
            limparSpans()
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`
            msg = dados.erro ? dados.erro : msg

            throw new Error(msg)
        }
        if(!dados) throw new Error("Dados esperados do servidor estão ausentes")
        
        //se passou das validação tudo preenche o dom
        preencherDados(dados)
    }
    catch(erro){
        spanErro.textContent = erro.message
        setTimeout(() => {
            spanErro.textContent = ""
        }, 3000);
    }
})

//funções top 
function validar({nome, nota1, nota2}) {
    if(!nome) return "Nome precisa estar preenchido"
    if(Number.isNaN(nota1) || Number.isNaN(nota2)) return "Insira um número válido para as notas"
    if(nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) return "Notas precisam ser um número entre 0 e 10"
    return null
}

// function limparSpans() {
//     dados.textContent = ""
//     alunoNome.textContent = ""
//     alunoMedia.textContent = ""
//     alunoGrau.textContent = ""
// }

function limparSpans() {
    let displays = document.querySelectorAll(".info")
    displays.forEach(e => e.textContent = "")
}

function preencherDados({nome, media, grau}) {
    dados.textContent = "Dados do Aluno"
    alunoNome.textContent = `Nome: ${nome}`
    alunoMedia.textContent = `Media: ${media}`
    alunoGrau.textContent = `Grau: ${grau}`
}