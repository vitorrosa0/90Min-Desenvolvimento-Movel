export function gerarMensagensMock(quantidade) {
  const nomes = ['João', 'Maria', 'Pedro', 'Ana', 'Gustavo', 'Sofia', 'Lucas', 'Laura', 'Gabriel', 'Vítor', 'Felipe', 'Julia'];
  const textosVariados = [
    'Vai ser um jogão!', 'Vamos Vascão 🔥💢', 'Achei que o jogo estaria mais fácil.', 'Que golaço, não esperava!',
    'Alguém viu a repetição do lance?', 'Estou muito animado para o segundo tempo.', 'A defesa precisa ficar mais atenta.',
    'Mandem suas apostas para o placar final!', 'Concordo plenamente.', 'Não sei, acho que não...',
    'Quero ver a reação do técnico.', 'Que jogada incrível do meio-campo!', 'Isso é falta clara!',
    'O juiz tá errando muito.', 'Que lance de sorte!', 'Precisamos de mais ataque.', 'Essa torcida tá demais!',
    'Faltam poucos minutos.', 'Onde vocês estão assistindo?', 'Que virada!',
  ];

  const mensagens = [];
  const now = new Date().getTime();

  for (let i = 1; i <= quantidade; i++) {
    const autor = nomes[Math.floor(Math.random() * nomes.length)];
    const texto = textosVariados[Math.floor(Math.random() * textosVariados.length)];
    

    const timestamp = now - (quantidade - i) * 15000;

    mensagens.push({
      id: String(timestamp) + i, // ID único
      autor: autor,
      texto: texto,
    });
  }

  return mensagens;
}