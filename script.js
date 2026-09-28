const perguntas = [
  {
    enunciado:
      'Assim que saiu da escola você se depara com uma nova tecnologia, um chat que consegue responder todas as dúvidas que uma pessoa pode ter. Ele também gera imagens e áudios hiper-realistas. Qual o primeiro pensamento?',
    alternativas: ['Isso é assustador!', 'Isso é maravilhoso!'],
  },
  {
    enunciado:
      'Com a descoberta desta tecnologia, chamada Inteligência Artificial (IA), uma professora de tecnologia da escola decidiu fazer uma sequência de aulas sobre ela. No fim de uma aula, ela pede que você escreva um trabalho sobre o uso de IA em sala de aula. Qual atitude você toma?',
    alternativas: [
      'Utiliza uma ferramenta de busca na internet que utiliza IA para ajudar a encontrar informações relevantes e explicar de uma forma mais fácil de entender.',
      'Escreve o trabalho com base nas conversas com colegas, algumas pesquisas na internet e conhecimentos próprios sobre o tema.',
    ],
  },
  {
    enunciado:
      'Após a elaboração do trabalho, a professora realizou um debate entre a turma para entender como foi realizada a pesquisa e a escrita. Nessa conversa também foi levantado um ponto muito importante: como a IA impacta o trabalho do futuro. Nesse debate, como você se posiciona?',
    alternativas: [
      'Defende a ideia de que a IA pode criar novas oportunidades de emprego e melhorar habilidades humanas.',
      'Se preocupa com as pessoas que podem perder seus empregos para máquinas e defende a importância de proteger os trabalhadores.',
    ],
  },
  {
    enunciado:
      'Ao final da discussão, você precisou criar uma imagem no computador que representasse o que pensa sobre IA. E agora?',
    alternativas: [
      'Criar uma imagem utilizando uma plataforma de design como o Paint.',
      'Criar uma imagem utilizando um gerador de imagem de IA.',
    ],
  },
  {
    enunciado:
      'Você tem um trabalho em grupo de biologia para entregar na semana seguinte. O andamento do trabalho está atrasado e uma pessoa do seu grupo decidiu fazer com ajuda de uma IA. O problema é que o trabalho está totalmente igual ao do chat. O que você faz?',
    alternativas: [
      'Escrever comandos para o chat é uma forma de contribuir com o trabalho, por isso não é um problema utilizar o texto inteiro.',
      'O chat pode ser uma tecnologia muito avançada, mas é preciso manter a atenção, pois toda máquina erra. Por isso, revisar o trabalho e contribuir com perspectivas pessoais é essencial.',
    ],
  },
];

const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const textoResultado = document.querySelector('.texto-resultado');
const progresso = document.querySelector('.progresso');
const botaoReiniciar = document.querySelector('.botao-reiniciar');
const botaoIniciar = document.querySelector('.iniciar-btn');
const telaInicial = document.querySelector('.tela-inicial');
const caixaQuiz = document.querySelector('.caixa-quiz');

let atual = 0;
let perguntaAtual;
const respostas = [];

function mostraPergunta() {
  perguntaAtual = perguntas[atual];

  if (!perguntaAtual) {
    mostraResultado();
    return;
  }

  if (caixaQuiz) caixaQuiz.classList.remove('hidden');
  if (telaInicial) telaInicial.classList.add('hidden');
  if (progresso) progresso.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
  if (caixaPerguntas) caixaPerguntas.textContent = perguntaAtual.enunciado;
  if (caixaAlternativas) caixaAlternativas.innerHTML = '';
  if (textoResultado) textoResultado.textContent = '';
  if (botaoReiniciar) botaoReiniciar.classList.add('hidden');

  perguntaAtual.alternativas.forEach((texto, index) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = texto;
    botao.className = 'alternativa';
    botao.addEventListener('click', () => respostaSelecionada(index));
    caixaAlternativas.appendChild(botao);
  });
}

function respostaSelecionada(index) {
  respostas.push({
    pergunta: perguntaAtual.enunciado,
    resposta: perguntaAtual.alternativas[index],
    perguntaIndex: atual,
    alternativaIndex: index,
  });

  if (textoResultado) {
    textoResultado.textContent = `Você escolheu: ${perguntaAtual.alternativas[index]}`;
  }

  atual += 1;

  setTimeout(() => {
    mostraPergunta();
  }, 800);
}

function mostraResultado() {
  if (caixaPerguntas) caixaPerguntas.textContent = 'Fim do questionário. Obrigado por participar!';
  if (caixaAlternativas) caixaAlternativas.innerHTML = '';
  if (textoResultado) textoResultado.textContent = gerarPresuncao();
  if (progresso) progresso.textContent = `${perguntas.length} de ${perguntas.length} perguntas respondidas`;
  if (botaoReiniciar) botaoReiniciar.classList.remove('hidden');
}

function gerarPresuncao() {
  const resumo = respostas.map((item) => {
    switch (item.perguntaIndex) {
      case 0:
        return item.alternativaIndex === 0
          ? 'Você começa com cautela, como alguém que prefere entender riscos antes de aceitar uma novidade.'
          : 'Você inicia otimista, interessado em descobrir o lado positivo da IA.';
      case 1:
        return item.alternativaIndex === 0
          ? 'Você confia na IA como uma parceira de pesquisa e valoriza eficiência.'
          : 'Você prefere usar suas próprias ideias e pesquisas para construir algo genuíno.';
      case 2:
        return item.alternativaIndex === 0
          ? 'Você acredita que a IA abre portas e ajuda as pessoas a desenvolver novas habilidades.'
          : 'Você está preocupado com justiça e impacto humano no mercado de trabalho.';
      case 3:
        return item.alternativaIndex === 0
          ? 'Você prefere ferramentas tradicionais e a criatividade humana para expressar ideias.'
          : 'Você está aberto a explorar a IA como forma de criar imagens e representar pensamentos.';
      case 4:
        return item.alternativaIndex === 0
          ? 'Você vê valor em usar a IA para ajudar, mesmo quando há risco de dependência.'
          : 'Você quer garantir que o trabalho mantenha sua identidade e não seja apenas cópia de um chat.';
      default:
        return '';
    }
  });

  const primeirasRespostas = resumo.filter(Boolean).slice(0, 3).join(' ');
  const ultimaResposta = resumo[4] ? ` No final, ${resumo[4].toLowerCase()}` : '';
  return `${primeirasRespostas || 'Obrigado por participar!'}${ultimaResposta}`;
}

function reiniciarQuestionario() {
  atual = 0;
  respostas.length = 0;
  if (telaInicial) telaInicial.classList.add('hidden');
  if (caixaQuiz) caixaQuiz.classList.remove('hidden');
  mostraPergunta();
}

function iniciaJogo() {
  atual = 0;
  respostas.length = 0;
  if (telaInicial) telaInicial.classList.add('hidden');
  if (caixaQuiz) caixaQuiz.classList.remove('hidden');
  mostraPergunta();
}

if (botaoIniciar) {
  botaoIniciar.addEventListener('click', iniciaJogo);
}

if (botaoReiniciar) {
  botaoReiniciar.addEventListener('click', reiniciarQuestionario);
}
