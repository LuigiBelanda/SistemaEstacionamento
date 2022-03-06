// contrato de como dever os dados de veiculos
interface IVeiculo {
  nome: string;
  placa: string;
  entrada: Date;
}

// Função anon invocada imediatamente
(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

  // função / funções principal
  function patio() {
    function ler() {}
    // add um novo carro ao estacionamento
    function adicionar(veiculo: IVeiculo) {
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
      $("#patio")?.appendChild(row);
    }
    function remover() {}
    function salvar() {}
    function render() {}

    return { ler, adicionar, remover, salvar, render };
  }

  // temos o ? abaixo pois o elemento pode ser nulo, com isso o ? deixa ele como não obrigatório
  $("#cadastrar")?.addEventListener("click", () => {
    // pegando os valores dos inputs quando clicarmos no botão cadastrar
    const nome = $("#nome")?.value;
    const placa = $("#placa")?.value;
    console.log({ nome, placa });

    // retorno caso algum campo esteja em branco
    if (!nome || !placa) {
      alert("Os campos nome e placa são obrigatórios!");
      return;
    }

    patio().adicionar({ nome, placa, entrada: new Date() });
  });
})();
