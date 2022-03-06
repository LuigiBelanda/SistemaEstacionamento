"use strict";
// Função anon invocada imediatamente
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    // função / funções principais
    function patio() {
        // lendo os dados no localstorage
        // ler() : tipo de dado retornado
        function ler() {
            // vendo se existe algum dado no localstorage
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        // salva os dados no localstorage
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        // add um novo carro ao estacionamento
        function adicionar(veiculo, salva) {
            var _a;
            // pegamos o começo da tabela
            const row = document.createElement("tr");
            // aqui colocamos o que queremos ter na nossa tabela
            row.innerHTML = `
      <td>${veiculo.nome}</td>
      <td>${veiculo.placa}</td>
      <td>${veiculo.entrada}</td>
      <td>
        <button class="delete" data-placa="${veiculo.placa}">X</button>
      </td>
      `;
            // colocamos nossa row na tabela
            (_a = $("#patio")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            // só serão salvas no localstorage os novos veiculos, isso serve para não duplicarmos os dados
            // a prop salva é boolean (V ou F), ela só será TRUE quando add um novo veiculo 
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover() { }
        function render() {
            // ! = forçar o código a pegar o elemento (obrigatório)
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => {
                    adicionar(veiculo);
                });
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    // temos o ? abaixo pois o elemento pode ser nulo, com isso o ? deixa ele como não obrigatório
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        // pegando os valores dos inputs quando clicarmos no botão cadastrar
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        console.log({ nome, placa });
        // retorno caso algum campo esteja em branco
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios!");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date() }, true);
    });
})();
