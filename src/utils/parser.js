import { TIPOS_TAREFA, PRIORIDADES } from '../types.js';

const MAPA_ICONES = {
  aula: 'ChalkboardTeacher',
  aluno: 'ChalkboardTeacher',
  ensino: 'ChalkboardTeacher',
  class: 'ChalkboardTeacher',

  medico: 'FirstAid',
  médico: 'FirstAid',
  dentista: 'FirstAid',
  consulta: 'FirstAid',
  hospital: 'FirstAid',
  remedio: 'Pill',
  remédio: 'Pill',

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

function calcularProximoDiaSemana(diaAlvo, dataReferencia = new Date()) {
  const hoje = new Date(dataReferencia);
  const diaAtual = hoje.getDay();
  let diff = diaAlvo - diaAtual;
  if (diff < 0) diff += 7;
  const alvo = new Date(hoje);
  alvo.setDate(hoje.getDate() + diff);
  return formatarDataISO(alvo);
}

function resolverTermoData(termo, dataBase = new Date()) {
  if (!termo) return null;
  const limpo = termo.trim().toLowerCase().replace(/^dia\s+/, '');

  if (DIAS_SEMANA[limpo] !== undefined) {
    return calcularProximoDiaSemana(DIAS_SEMANA[limpo], dataBase);
  }

  const matchBr = limpo.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/);
  if (matchBr) {
    const d = String(matchBr[1]).padStart(2, '0');
    const m = String(matchBr[2]).padStart(2, '0');
    const anoAtual = dataBase.getFullYear();
    const anoStr = matchBr[3]
      ? (matchBr[3].length === 2 ? `20${matchBr[3]}` : matchBr[3])
      : String(anoAtual);
    return `${anoStr}-${m}-${d}`;
  }

  return null;
}

export function processarInputRapido(textoBruto) {
  if (!textoBruto || !textoBruto.trim()) return null;

  let texto = textoBruto.trim();
  let contexto = 'geral';
  let horario = null;
  let tipo = TIPOS_TAREFA.FOCO;
  let cadencia = null;
  let proximaData = null;
  let dataInicio = null;
  let dataLimite = null;
  let ehRotina = false;
  let intervaloDias = 7;

  // 1. Extração de Horário (@14h, às 23h, as 23h, @14:30)
  const regexHorario = /(?:@|(?:\s|^)[a\u00e0\u00e1]s\s*)(\d{1,2}(?::\d{2}|h\d{2}|h)?)/i;
  const matchHorario = texto.match(regexHorario);
  if (matchHorario) {
    let raw = matchHorario[1].toLowerCase().replace('h', ':');
    if (!raw.includes(':')) raw += ':00';
    const [h, m] = raw.split(':');
    horario = `${String(h).padStart(2, '0')}:${String(m || '00').padStart(2, '0')}`;
    texto = texto.replace(matchHorario[0], '').trim();
    tipo = TIPOS_TAREFA.AGENDADO;
  }

  // 2. Extração de Contexto Unicode (#agenda, #casa/jardim)
  const regexContexto = /#([\p{L}\p{N}\s\-_/]+)(?:\s|$)/u;
  const matchContexto = texto.match(regexContexto);
  if (matchContexto) {
    contexto = matchContexto[1].trim().toLowerCase();
    texto = texto.replace(matchContexto[0], '').trim();
  }

  // 3. Reconhecimento de Janela de Rotina (Período com Início e Fim)
  // 3a. "de [dia/data] até/à [dia/data]"
  const regexDeAte = /\bde\s+(?:dia\s+)?([^\s]+)\s+(?:at[eé]|à|[aà])\s+(?:dia\s+)?([^\s]+)\b/i;
  const matchDeAte = texto.match(regexDeAte);

  // 3b. "começando [dia/data] terminando [dia/data]"
  const regexComecando = /\bcome[çc]ando(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\s+terminando(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\b/i;
  const matchComecando = texto.match(regexComecando);

  // 3c. "inicio [dia/data] limite [dia/data]"
  const regexInicioLimite = /\bin[ií]cio(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\s+limite(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\b/i;
  const matchInicioLimite = texto.match(regexInicioLimite);

  // 3d. Apenas final: "até [dia/data]" ou "limite [dia/data]"
  const regexApenasAte = /\b(?:at[eé]|limite)(?:\s+dia)?\s+([^\s]+)\b/i;

  if (matchDeAte) {
    const dIni = resolverTermoData(matchDeAte[1]);
    const dFim = resolverTermoData(matchDeAte[2]);
    if (dIni && dFim) {
      ehRotina = true;
      dataInicio = dIni;
      dataLimite = dFim;
      if (dataLimite < dataInicio) {
        const dtAjuste = new Date(`${dataLimite}T00:00:00`);
        dtAjuste.setDate(dtAjuste.getDate() + 7);
        dataLimite = formatarDataISO(dtAjuste);
      }
      texto = texto.replace(matchDeAte[0], '').trim();
    }
  } else if (matchComecando) {
    const dIni = resolverTermoData(matchComecando[1]);
    const dFim = resolverTermoData(matchComecando[2]);
    if (dIni && dFim) {
      ehRotina = true;
      dataInicio = dIni;
      dataLimite = dFim;
      if (dataLimite < dataInicio) {
        const dtAjuste = new Date(`${dataLimite}T00:00:00`);
        dtAjuste.setDate(dtAjuste.getDate() + 7);
        dataLimite = formatarDataISO(dtAjuste);
      }
      texto = texto.replace(matchComecando[0], '').trim();
    }
  } else if (matchInicioLimite) {
    const dIni = resolverTermoData(matchInicioLimite[1]);
    const dFim = resolverTermoData(matchInicioLimite[2]);
    if (dIni && dFim) {
      ehRotina = true;
      dataInicio = dIni;
      dataLimite = dFim;
      if (dataLimite < dataInicio) {
        const dtAjuste = new Date(`${dataLimite}T00:00:00`);
        dtAjuste.setDate(dtAjuste.getDate() + 7);
        dataLimite = formatarDataISO(dtAjuste);
      }
      texto = texto.replace(matchInicioLimite[0], '').trim();
    }
  } else {
    const matchAte = texto.match(regexApenasAte);
    if (matchAte) {
      const dFim = resolverTermoData(matchAte[1]);
      if (dFim) {
        ehRotina = true;
        dataInicio = formatarDataISO(new Date());
        dataLimite = dFim;
        if (dataLimite < dataInicio) {
          const dtAjuste = new Date(`${dataLimite}T00:00:00`);
          dtAjuste.setDate(dtAjuste.getDate() + 7);
          dataLimite = formatarDataISO(dtAjuste);
        }
        texto = texto.replace(matchAte[0], '').trim();
      }
    }
  }

  // 4. Reconhecimento de Frequência Explícita (1x semana, diariamente, etc.)
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
  if (matchACada) {
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
  if (matchVezPor) {
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

  // 5. Data única sem janela ("dia 15/10", "15/10")
  if (!ehRotina) {
    const regexDataBr = /(?:^|\s)(?:dia\s+)?(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?(?=\s|$)/i;
    const matchDataBr = texto.match(regexDataBr);
    if (matchDataBr) {
      const d = String(matchDataBr[1]).padStart(2, '0');
      const m = String(matchDataBr[2]).padStart(2, '0');
      const anoAtual = new Date().getFullYear();
      const anoStr = matchDataBr[3]
        ? (matchDataBr[3].length === 2 ? `20${matchDataBr[3]}` : matchDataBr[3])
        : String(anoAtual);

      proximaData = `${anoStr}-${m}-${d}`;
      texto = texto.replace(matchDataBr[0], '').trim();
      if (horario) {
        tipo = TIPOS_TAREFA.AGENDADO;
      }
    }
  }

  // 6. Configuração Final de Rotina vs Agenda vs Foco
  if (ehRotina) {
    tipo = TIPOS_TAREFA.CADENCIA;
    if (!dataInicio) {
      dataInicio = formatarDataISO(new Date());
    }
    proximaData = dataInicio;
    cadencia = {
      intervaloDias,
      dataInicio,
      dataLimite,
    };
  } else if (horario) {
    tipo = TIPOS_TAREFA.AGENDADO;
    if (contexto === 'geral') {
      contexto = 'agenda';
    }
  }

  // 7. Seleção de Ícone
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
