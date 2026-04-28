export function exibeErro(elemento, msg, tempo) {
    elemento.textContext = msg;
    setTimeout(() => {
        elemento.textContext = "";
    }, tempo);
}

export async function fazRequisicaoAA(url, metodo, dados = null) {
    if (metodo === "GET") return await fetch(url);
    let obj = {
        method: metodo,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: (dados) ? JSON.stringify(dados) : null
    };
    return await fetch(url, obj);
}

export function verificaErros(resp) {
    if (!resp.ok) {
        return resp.text().then(texto => {
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`;
            try {
                const dados = JSON.parse(texto);
                if (dados?.erro) msg = dados.erro;
            } catch (erro) {

            }
            throw new Error(msg);
        });
    }

    return resp.json().then(dados => {
        if (!dados)
            throw new Error('Informações esperadas do servidor ausentes.');
        return dados;
    });
}