const inputNome = document.querySelector("#inputNome")
const inputPeso = document.querySelector("#inputPeso")
const inputAltura = document.querySelector("#inputAltura")
const btn = document.querySelector("button")
const pNome = document.querySelector("#pNome")
const pImc = document.querySelector("#pImc")
const pClassificacao = document.querySelector("#pClassificacao")
const spanErro = document.querySelector("#spanErro")

btn.addEventListener("click", async function () {
    const dadosForm = {
        nome: inputNome.value,
        altura: inputAltura.value,
        peso: inputPeso.value
    }

    msgErro = validar(dadosForm)
    if (msgErro) {
        spanErro.textContent = msgErro
        setTimeout(() => {
            spanErro.textContent = ""
        }, 3000);
        return //se tem erro nem tenta fazer o resto
    }

    try {
        let resp = await fetch("processaDados.php",
            {
                method: 'POST',
                body: JSON.stringify(dadosForm),
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            }
        )
        let dados = null

        try {
            dados = await resp.json()
        } catch {

        }

        if (!resp.ok) {
            limparParagrafos()
            console.log(resp)
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`
            msg = dados.erro ? dados.erro : msg

            throw new Error(msg)
        }

        if (!dados) throw new Error("Dados esperados do servidor estão ausentes")

        preencherParagrafos(dados)
    }

    catch (erro) {
        spanErro.textContent = erro.message
        setTimeout(() => {
            spanErro.textContent = ""
        }, 3000);
    }

})

function validar(nome, altura, peso) {
    if (!nome) return "Nome precisa estar preenchido"
    if (Number.isNaN(altura) || Number.isNaN(peso)) return "Insira um número válido para peso e alturaa"
    if (altura < 0.3 || altura > 2.5 || peso < 10 || peso > 300) return "Altura precisa estrar entre 0,30m e 2,50m e peso entre 10kg e 300kg"
    return null
}

function limparParagrafos() {
    let paragrafos = document.querySelectorAll("p")
    paragrafos.forEach(p => p.textContent = "")
}

function preencherParagrafos({ nome, imc, classificacao }) {
    pNome.textContent = `Nome: ${nome}`
    pImc.textContent = `IMC: ${imc.toFixed(2)}`
    pClassificacao.textContent = `Classificação: ${classificacao}`
}