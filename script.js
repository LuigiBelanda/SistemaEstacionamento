"use strict";
// Função anon invocada imediatamente
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    // temos o ? abaixo pois o elemento pode ser nulo, com isso o ? deixa ele como não obrigatório
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        console.log({ nome, placa });
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios!");
            return;
        }
    });
})();
