const perguntas = [
  {
    enunciado:
      "Assim que saiu da escola você se depara com uma nova tecnologia, um chat que consegue responder todas as dúvidas que uma pessoa pode ter, ele também gera imagens e áudios hiper-realistas. Qual o primeiro pensamento?",
    alternativas: ["Isso é assustador!", "Isso é maravilhoso!"],
  },
  {
    enunciado:
      "Com a descoberta desta tecnologia, chamada Inteligência Artificial (IA), uma professora de tecnologia da escola decidiu fazer uma sequência de aulas sobre esta tecnologia. No fim de uma aula ela pede que você escreva um trabalho sobre o uso de IA em sala de aula. Qual atitude você toma?",
    alternativas: [
      "Utiliza uma ferramenta de busca na internet que utiliza IA para que ela ajude a encontrar informações relevantes para o trabalho e explique numa linguagem que facilite o entendimento.",
      "Escreve o trabalho com base nas conversas que teve com colegas, algumas pesquisas na internet e conhecimentos próprios sobre o tema.",
    ],
  },
  {
    enunciado:
      "Após a elaboração do trabalho, a professora realizou um debate entre a turma para entender como foi realizada a pesquisa e escrita. Nessa conversa também foi levantado um ponto muito importante: como a IA impacta o trabalho do futuro. Nesse debate, como você se posiciona?",
    alternativas: [
      "Defende a ideia de que a IA pode criar novas oportunidades de emprego e melhorar habilidades humanas.",
      "Me preocupo com as pessoas que perderão seus empregos para máquinas e defendo a importância de proteger os trabalhadores.",
    ],
  },
  {
    enunciado:
      "Ao final da discussão, você precisou criar uma imagem no computador que representasse o que pensa sobre IA. E agora?",
    alternativas: [
      "Criar uma imagem utilizando uma plataforma de design como o Paint.",
      "Criar uma imagem utilizando um gerador de imagem de IA.",
    ],
  },
  {
    enunciado:
      "Você tem um trabalho em grupo de biologia para entregar na semana seguinte, o andamento do trabalho está um pouco atrasado e uma pessoa do seu grupo decidiu fazer com ajuda de uma IA. O problema é que o trabalho está totalmente igual ao do chat. O que você faz?",
    alternativas: [
      "Escrever comandos para o chat é uma forma de contribuir com o trabalho, por isso não é um problema utilizar o texto inteiro.",
      "O chat pode ser uma tecnologia muito avançada, mas é preciso manter a atenção pois toda máquina erra, por isso revisar o trabalho e contribuir com as perspectivas pessoais é essencial.",
    ],
  },
];

const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const textoResultado = document.querySelector('.texto-resultado');
const progresso = document.querySelector('.progresso');
const botaoReiniciar = document.querySelector('.botao-reiniciar');

let atual = 0;
let perguntaAtual;
const respostas = [];

function mostraPergunta() {
  perguntaAtual = perguntas[atual];

  if (!perguntaAtual) {
    caixaPerguntas.textContent = 'Fim do questionário. Obrigado por participar!';
    caixaAlternativas.innerHTML = '';
    textoResultado.textContent = gerarPresuncao();
    progresso.textContent = `${perguntas.length} de ${perguntas.length} perguntas respondidas`;
    botaoReiniciar.classList.remove('hidden');
    return;
  }

  progresso.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.innerHTML = '';
  textoResultado.textContent = '';
  botaoReiniciar.classList.add('hidden');

  perguntaAtual.alternativas.forEach((texto, index) => {
    const botao = document.createElement('button');
    botao.textContent = texto;
    botao.className = 'alternativa';
    botao.addEventListener('click', () => escolheAlternativa(index));
    caixaAlternativas.appendChild(botao);
  });
}

function escolheAlternativa(index) {
  respostas.push({
    pergunta: perguntaAtual.enunciado,
    resposta: perguntaAtual.alternativas[index],
    perguntaIndex: atual,
    alternativaIndex: index,
  });

  textoResultado.textContent = `Você escolheu: ${perguntaAtual.alternativas[index]}`;
  atual += 1;

  setTimeout(() => {
    mostraPergunta();
  }, 800);
}

function gerarPresuncao() {
  const resumo = respostas.map((item, idx) => {
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

  const primeirasRespostas = resumo.slice(0, 3).join(' ');
  const ultimaResposta = resumo[4] ? ` No final, ${resumo[4].toLowerCase()}` : '';
  return `${primeirasRespostas}${ultimaResposta}`;
}

function reiniciarQuestionario() {
  atual = 0;
  respostas.length = 0;
  mostraPergunta();
}

botaoReiniciar.addEventListener('click', reiniciarQuestionario);

document.addEventListener('DOMContentLoaded', mostraPergunta);