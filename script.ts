// Função anon invocada imediatamente
(function () {
  const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

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
  });
})();
