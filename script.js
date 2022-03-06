// Função anon invocada imediatamente
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    // calcula o tempo que o veiculo ficou no estacionamento
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
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
            var _a, _b;
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
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            // colocamos nossa row na tabela
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            // só serão salvas no localstorage os novos veiculos, isso serve para não duplicarmos os dados
            // a prop salva é boolean (V ou F), ela só será TRUE quando add um novo veiculo
            if (salva)
                salvar([...ler(), veiculo]);
        }
        // remove os carros do estacionamento
        function remover(placa) {
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} permaneceu por ${tempo}, deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
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
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
