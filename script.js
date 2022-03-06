"use strict";
// Função anon invocada imediatamente
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    // função / funções principal
    function patio() {
        function ler() { }
        function adicionar(veiculo) {
            var _a;
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${veiculo.nome}</td>
      <td>${veiculo.placa}</td>
      <td>${veiculo.entrada}</td>
      <td>
        <button class="delete" data-placa="${veiculo.placa}">X</button>
      </td>
      `;
            (_a = $("#patio")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
        }
        function remover() { }
        function salvar() { }
        function render() { }
        return { ler, adicionar, remover, salvar, render };
    }
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
        patio().adicionar({ nome, placa, entrada: new Date() });
    });
})();
