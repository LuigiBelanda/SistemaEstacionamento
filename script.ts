// contrato de como dever os dados de veiculos
interface IVeiculo {
  nome: string;
  placa: string;
  entrada: Date | string;
}

// Função anon invocada imediatamente
(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

  // calcula o tempo que o veiculo ficou no estacionamento
  function calcTempo(mil: number) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);

    return `${min}m e ${sec}s`;
  }

  // função / funções principais
  function patio() {
    // lendo os dados no localstorage
    // ler() : tipo de dado retornado
    function ler(): IVeiculo[] {
      // vendo se existe algum dado no localstorage
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }

    // salva os dados no localstorage
    function salvar(veiculos: IVeiculo[]) {
      localStorage.setItem("patio", JSON.stringify(veiculos));
    }

    // add um novo carro ao estacionamento
    function adicionar(veiculo: IVeiculo, salva?: boolean) {
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

      row.querySelector(".delete")?.addEventListener("click", function () {
        remover(this.dataset.placa);
      });

      // colocamos nossa row na tabela
      $("#patio")?.appendChild(row);

      // só serão salvas no localstorage os novos veiculos, isso serve para não duplicarmos os dados
      // a prop salva é boolean (V ou F), ela só será TRUE quando add um novo veiculo
      if (salva) salvar([...ler(), veiculo]);
    }

    // remove os carros do estacionamento
    function remover(placa: string) {
      const { entrada, nome } = ler().find(
        (veiculo) => veiculo.placa === placa
      );

      const tempo = calcTempo(
        new Date().getTime() - new Date(entrada).getTime()
      );

      if (
        !confirm(`O veiculo ${nome} permaneceu por ${tempo}, deseja encerrar?`)
      )
        return;

      salvar(ler().filter((veiculo) => veiculo.placa !== placa));
      render();
    }

    function render() {
      // ! = forçar o código a pegar o elemento (obrigatório)
      $("#patio")!.innerHTML = "";
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

    patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
  });
})();
