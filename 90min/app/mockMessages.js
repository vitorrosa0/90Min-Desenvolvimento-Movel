export function gerarMensagensMock(quantidade) {
  const nomes = [
    'João', 'Maria', 'Pedro', 'Ana', 'Gustavo', 'Sofia', 'Lucas', 'Laura', 'Gabriel', 'Vítor', 'Felipe', 'Julia',
    'Rafael', 'Carla', 'Thiago', 'Beatriz', 'André', 'Camila', 'Henrique', 'Luiza', 'Diego', 'Isabela', 'Marcos',
    'Patrícia', 'Leonardo', 'Helena', 'Fábio', 'Natália', 'Ricardo', 'Letícia', 'Eduardo', 'Bianca', 'Caio',
    'Fernanda', 'Bruno', 'Larissa', 'Rodrigo', 'Aline', 'Samuel', 'Vitória', 'Daniel', 'Caroline', 'Otávio',
    'Juliana', 'Mateus', 'Manuela', 'Arthur', 'Gabriela', 'Paulo', 'Lorena', 'Alberto', 'Emanuelly', 'Jorge',
    'Vanessa', 'Miguel', 'Raquel', 'Sérgio', 'Tainá'
  ];

  const textosVariados = [
    'Vai ser um jogão!', 'Vamos Vascão 🔥💢', 'Achei que o jogo estaria mais fácil.', 'Que golaço, não esperava!',
    'Alguém viu a repetição do lance?', 'Estou muito animado para o segundo tempo.', 'A defesa precisa ficar mais atenta.',
    'Mandem suas apostas para o placar final!', 'Concordo plenamente.', 'Não sei, acho que não...',
    'Quero ver a reação do técnico.', 'Que jogada incrível do meio-campo!', 'Isso é falta clara!',
    'O juiz tá errando muito.', 'Que lance de sorte!', 'Precisamos de mais ataque.', 'Essa torcida tá demais!',
    'Faltam poucos minutos.', 'Onde vocês estão assistindo?', 'Que virada!', 'Bora virar esse jogo!!! 🔥',
    'QUE DEFESA! absurdo!', 'Esse goleiro tá impossível hoje.', 'Juiz comprado?', 'Só falta mais um gol!',
    'O time tá dominando.', 'Pênalti claro e nada...', 'Se fizer mais um eu infarto 😂', 'O técnico demorou pra mexer.',
    'Esse jogador é muito craque.', 'Hoje o time tá irreconhecível.', 'Não acredito que perdeu esse gol!',
    'GOOOOOOLLLL 🔥🔥🔥🔥', 'Meu Deus que lance!!!', 'Tá bonito de ver!', 'A retranca tá matando o jogo.',
    'Time morto no segundo tempo.', 'Isso aí, raça!', 'Que nervoso, meu Deus.', 'Esse jogo tá insano!',
    'Ninguém marca esse cara?', 'CADE O VAR???', 'Vai dar bom, confia.', 'Hoje sim, hoje sim!',
    'Esse comentarista fala demais...', 'Que passe absurdo!', 'O atacante erra tudo.',
    'Se empatar já tá ótimo.', 'Agora acabou.', 'O juiz tá distribuindo cartão à toa.',
    'PQP QUE GOLAÇO 🔥🔥🔥', 'Que clima no estádio!', 'Torcida jogando junto demais.',
    'To vendo com delay 😭', 'Aqui tá travando kkkkk', 'Isso aí time!!', 'Que pressão absurda!',
    'Vai, vai, vai!!!', 'Quase!!!', 'Merecia o gol!', 'É agora!!!', 'Chutaaaaaaa!!',
    'Jesus amado, que sufoco.', 'Esse jogo envelhecendo 10 anos', 'Não aguento mais esse time 😂',
    'O cara não acerta UM passe.', 'Time adversário só cai no chão...', 'Entrou mal demais.',
    'Esse reserva é melhor que o titular.', 'O VAR vai chamar!', 'Que bomba!!!', 'NÃO ERA PRA TER TIRADO ELE!',
    'Esse juiz é uma piada.', 'Ridículo isso...', 'Agora o jogo virou mesmo.', 'Tá acabandoooo 😭',
    'Se perder eu nem durmo.', 'QUE JOGO DOENTE 😂🔥'
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