'use strict';
import { exibirErro } from "../util.js";

const divFilmes = document.querySelector("#divFilmes");
const spanErro = document.querySelector("#erro");

(()=> {
    fetch("filmes.json")
    .then(resp => { 
        if(!resp.ok) 
            throw new Error(`deu ruim pai: ${resp.status} - ${resp.statusText}`);
        return resp.json();
    })
    .then(dados => {
        montarListaDeFilmes(dados.filmes);
    })
    .catch(erro => {
        exibirErro(spanErro, erro.message, 3000);
    })
})();

function montarListaDeFilmes(filmes) {
    while(divFilmes.firstChild)
        divFilmes.removeChild(divFilmes.firstChild);
    filmes.forEach(filme =>{
        
        const ulFilme = document.createElement('ul');
        const{id, titulo, resumo, generos, elenco, lancamento} = filme;
        const [liId, liTitulo, liResumo, liGeneros, liElenco, liLancamento] = ['li', 'li', 'li', 'li', 'li', 'li'].map(elemento => document.createElement(elemento));

        liId.innerHTML = `<strong>Id:</strong> ${id}`;
        liTitulo.innerHTML = `<strong>Titulo:</strong> ${titulo}`;
        liResumo.innerHTML = `<strong>Resumo:</strong> ${resumo}`;
        liLancamento.innerHTML = `<strong>Lançamento:</strong> ${lancamento.dia} (${lancamento.pais})`;
        liGeneros.innerHTML = `<strong>Generos:</strong>`;
        const ulGeneros = document.createElement('ul');
        liGeneros.appendChild(ulGeneros);
        generos.forEach(genero => {
            const liGenero = document.createElement('li');
            liGenero.textContent = genero;
            ulGeneros.appendChild(liGenero);
        });
        liElenco.innerHTML = `<strong>Elenco:</strong>`;
        const ulElenco = document.createElement('ul');
        liElenco.appendChild(ulElenco);
        elenco.forEach(atorObj => {
            const liAtor = document.createElement('li');
            liAtor.textContent = atorObj.ator;
            ulElenco.appendChild(liAtor);
        })

        const linha = document.createElement('hr');

        ulFilme.append(liId, liTitulo, liResumo, liGeneros, liElenco, liLancamento, linha);
        divFilmes.appendChild(ulFilme);
    })
}