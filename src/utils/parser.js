import { TIPOS_TAREFA, PRIORIDADES } from '../types';

const MAPA_ICONES = {
  aula: 'ChalkboardTeacher',
  aluno: 'ChalkboardTeacher',
  ensino: 'ChalkboardTeacher',
  class: 'ChalkboardTeacher',

  limpeza: 'Broom',
  limpar: 'Broom',
  pano: 'Broom',
  banheiro: 'Broom',
  quintal: 'Broom',
  lixo: 'Trash',
  casa: 'House',
  obra: 'Hammer',
  conserto: 'Wrench',
  ferramenta: 'Wrench',
  torneira: 'Drop',

  treino: 'Barbell',
  academia: 'Barbell',
  corrida: 'PersonSimpleRun',
  correr: 'PersonSimpleRun',
  agua: 'Drop',
  remédio: 'Pill',
  remedio: 'Pill',
  meditar: 'Heartbeat',

  pc: 'Cpu',
  computador: 'Cpu',
  codigo: 'Cpu',
  código: 'Cpu',
  bug: 'Cpu',
  deploy: 'Cpu',
  app: 'Cpu',
  software: 'Cpu',
  programacao: 'Cpu',
  programação: 'Cpu',
  quizhub: 'Cpu',
  hos: 'Cpu',
  estudo: 'BookOpen',
  ler: 'BookOpen',
  livro: 'BookOpen',
  reuniao: 'UsersThree',
};

const DIAS_SEMANA = {
  domingo: 0,
  segunda: 1,
  'segunda-feira': 1,
  terca: 2,
  terça: 2,
  'terca-feira': 2,
  'terça-feira': 2,
  quarta: 3,
  'quarta-feira': 3,
  quinta: 4,
  'quinta-feira': 4,
  sexta: 5,
  'sexta-feira': 5,
  sabado: 6,
  sábado: 6,
};

const NUMEROS_EXTENSO = {
  um: 1,
  uma: 1,
  dois: 2,
  duas: 2,
  tres: 3,
  três: 3,
  quatro: 4,
  cinco: 5,
  seis: 6,
  sete: 7,
  oito: 8,
  nove: 9,
  dez: 10,
  quinze: 15,
  vinte: 20,
  trinta: 30,
};

function formatarDataISO(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function calcularProximoDiaSemana(diaAlvo) {
  const hoje = new Date();
  const diaAtual = hoje.getDay();
  let diff = diaAlvo - diaAtual;
  if (diff < 0) diff += 7;
  const alvo = new Date(hoje);
  alvo.setDate(hoje.getDate() + diff);
  return formatarDataISO(alvo);
}

export function processarInputRapido(textoBruto) {
  if (!textoBruto || !textoBruto.trim()) return null;

  let texto = textoBruto.trim();
  let contexto = 'geral';
  let horario = null;
  let tipo = TIPOS_TAREFA.FOCO;
  let cadencia = null;
  let proximaData = null;

  // 1. Extração de Horário (@14:30 ou @8h)
  const regexHorario = /@(\d{1,2}(?::\d{2}|h\d{2}|h)?)/i;
  const matchHorario = texto.match(regexHorario);
  if (matchHorario) {
    let raw = matchHorario[1].toLowerCase().replace('h', ':');
    if (!raw.includes(':')) raw += ':00';
    const [h, m] = raw.split(':');
    horario = `${String(h).padStart(2, '0')}:${String(m || '00').padStart(2, '0')}`;
    texto = texto.replace(matchHorario[0], '').trim();
    tipo = TIPOS_TAREFA.AGENDADO;
  }

  // 2. Extração de Contexto com suporte total a acentos Unicode (#francês, #manutenção)
  const regexContexto = /#([\p{L}\p{N}\s\-_/]+)(?:\s|$)/u;
  const matchContexto = texto.match(regexContexto);
  if (matchContexto) {
    contexto = matchContexto[1].trim().toLowerCase();
    texto = texto.replace(matchContexto[0], '').trim();
  }

  // 3. Ponto de Início
  const regexInicio =
    /\b(?:iniciando(?:\s+no|\s+na)?|a\s+partir\s+de|come[çc]ando(?:\s+no|\s+na)?)\s+(domingo|segunda(?:-feira)?|ter[çc]a(?:-feira)?|quarta(?:-feira)?|quinta(?:-feira)?|sexta(?:-feira)?|s[aá]bado)\b/i;
  const matchInicio = texto.match(regexInicio);
  if (matchInicio) {
    const diaNome = matchInicio[1].toLowerCase();
    const diaAlvo = DIAS_SEMANA[diaNome];
    if (diaAlvo !== undefined) {
      proximaData = calcularProximoDiaSemana(diaAlvo);
    }
    texto = texto.replace(matchInicio[0], '').trim();
  }

  // 4. Reconhecimento de Rotinas
  let ehRotina = false;
  let intervaloDias = 7;

  const regexAdverbios = /\b(diariamente|semanalmente|quinzenalmente|mensalmente|anualmente)\b/i;
  const matchAdv = texto.match(regexAdverbios);
  if (matchAdv) {
    ehRotina = true;
    const adv = matchAdv[1].toLowerCase();
    if (adv === 'diariamente') intervaloDias = 1;
    if (adv === 'semanalmente') intervaloDias = 7;
    if (adv === 'quinzenalmente') intervaloDias = 15;
    if (adv === 'mensalmente') intervaloDias = 30;
    if (adv === 'anualmente') intervaloDias = 365;
    texto = texto.replace(matchAdv[0], '').trim();
  }

  const regexACada =
    /\ba\s+cada\s+(\d+|um|uma|dois|duas|tr[êe]s|quatro|cinco|seis|sete|oito|nove|dez|quinze|vinte|trinta)\s+(dias?|semanas?|m[êe]ses?|anos?)\b/i;
  const matchACada = texto.match(regexACada);
  if (!ehRotina && matchACada) {
    ehRotina = true;
    const qtdRaw = matchACada[1].toLowerCase();
    const unidade = matchACada[2].toLowerCase();
    const qtd = NUMEROS_EXTENSO[qtdRaw] || parseInt(qtdRaw, 10) || 1;

    if (unidade.startsWith('dia')) intervaloDias = qtd;
    else if (unidade.startsWith('semana')) intervaloDias = qtd * 7;
    else if (unidade.startsWith('m')) intervaloDias = qtd * 30;
    else if (unidade.startsWith('ano')) intervaloDias = qtd * 365;

    texto = texto.replace(matchACada[0], '').trim();
  }

  const regexVezPor =
    /\b(\d+|um|uma|dois|duas|tr[êe]s|quatro|cinco)\s*(?:x|vez(?:es)?)\s+(?:por|na|no|ao|à)\s+(dia|semana|m[êe]s|mes|ano)\b/i;
  const matchVezPor = texto.match(regexVezPor);
  if (!ehRotina && matchVezPor) {
    ehRotina = true;
    const vezesRaw = matchVezPor[1].toLowerCase();
    const unidade = matchVezPor[2].toLowerCase();
    const vezes = NUMEROS_EXTENSO[vezesRaw] || parseInt(vezesRaw, 10) || 1;

    if (unidade === 'dia') intervaloDias = 1;
    else if (unidade === 'semana') intervaloDias = Math.max(1, Math.round(7 / vezes));
    else if (unidade === 'mês' || unidade === 'mes') intervaloDias = Math.max(1, Math.round(30 / vezes));
    else if (unidade === 'ano') intervaloDias = Math.max(1, Math.round(365 / vezes));

    texto = texto.replace(matchVezPor[0], '').trim();
  }

  const regexTodo =
    /\b(?:todos?\s+os|todas?\s+as|todo|toda)\s+(dia|semana|m[êe]s|domingo|segunda(?:-feira)?|ter[çc]a(?:-feira)?|quarta(?:-feira)?|quinta(?:-feira)?|sexta(?:-feira)?|s[aá]bado)\b/i;
  const matchTodo = texto.match(regexTodo);
  if (!ehRotina && matchTodo) {
    ehRotina = true;
    const alvo = matchTodo[1].toLowerCase();
    if (alvo === 'dia') {
      intervaloDias = 1;
    } else if (alvo === 'semana') {
      intervaloDias = 7;
    } else if (alvo === 'mês' || alvo === 'mes') {
      intervaloDias = 30;
    } else {
      intervaloDias = 7;
      if (!proximaData && DIAS_SEMANA[alvo] !== undefined) {
        proximaData = calcularProximoDiaSemana(DIAS_SEMANA[alvo]);
      }
    }
    texto = texto.replace(matchTodo[0], '').trim();
  }

  if (ehRotina) {
    tipo = TIPOS_TAREFA.CADENCIA;
    if (!proximaData) {
      proximaData = formatarDataISO(new Date());
    }
    cadencia = { intervaloDias };
  }

  // 5. Ícone
  let icone = tipo === TIPOS_TAREFA.AGENDADO ? 'Clock' : 'Circle';
  const textoMinusculo = texto.toLowerCase();
  for (const [chave, iconeNome] of Object.entries(MAPA_ICONES)) {
    if (textoMinusculo.includes(chave)) {
      icone = iconeNome;
      break;
    }
  }

  const tituloLimpo = texto.replace(/\s{2,}/g, ' ').replace(/^[-–—,]\s*/, '').trim();

  return {
    titulo: tituloLimpo,
    icone,
    contexto,
    tipo,
    horario,
    cadencia,
    proximaData,
    prioridade: PRIORIDADES.P2,
  };
}
