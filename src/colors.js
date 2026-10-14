export const THEME = {
  // Estrutura Geral
  app: {
    bg: 'bg-white',
    text: 'text-zinc-900',
    headerBg: 'bg-white/95 backdrop-blur-md',
    headerBorder: 'border-zinc-200',
    headerTitle: 'text-zinc-900',
  },

  // Barra Inferior (BottomNav)
  nav: {
    bg: 'bg-white/95 backdrop-blur-md',
    border: 'border-zinc-200',
    itemAtivo: 'text-zinc-950 font-bold',
    itemInativo: 'text-zinc-400 hover:text-zinc-600',
  },

  // Input Rápido do Topo (QuickInput)
  quickInput: {
    bg: 'bg-zinc-50',
    border: 'border-zinc-300',
    borderFocus: 'focus:border-zinc-500',
    text: 'text-zinc-900',
    placeholder: 'placeholder-zinc-400',
    btn: 'text-zinc-400 hover:text-zinc-800',
  },

  // Bloco 1: Agendados (Azul Celeste)
  agendados: {
    titulo: 'text-sky-700',
    cardBg: 'bg-sky-50',
    cardBorder: 'border-sky-200/90',
    icone: 'text-sky-600',
    texto: 'text-sky-950',
    horario: 'text-sky-900',
    tempoRestante: 'text-sky-600',
  },

  // Bloco 2: Rotina (Violeta / Púrpura)
  rotina: {
    titulo: 'text-purple-700',
    cardBg: 'bg-purple-50/80',
    cardBorder: 'border-purple-200 hover:border-purple-300',
    icone: 'text-purple-600',
    texto: 'text-purple-950',
    checkBtn: 'text-purple-400 hover:text-purple-600',
    alertaAtrasado: 'bg-rose-100 text-rose-700 border-rose-200',
  },

  // Bloco 3: Foco Atual (Âmbar / Laranja)
  foco: {
    titulo: 'text-amber-800',
    // Card Principal
    principalBg: 'bg-amber-50',
    principalBorder: 'border-amber-200',
    principalIcone: 'text-amber-700',
    principalTexto: 'text-zinc-900',
    principalDivisor: 'border-amber-200/80',
    concluirBtn: 'bg-amber-900 text-amber-50 hover:bg-amber-950', // Tom escuro da cor de Foco Atual
    pularBtn: 'text-zinc-500 hover:text-zinc-800',
    vazioBg: 'bg-zinc-50 border-zinc-300 text-zinc-500',
    // Cards Radar
    radarTitulo: 'text-zinc-500',
    radarBg: 'bg-orange-50/50',
    radarBorder: 'border-orange-200/80',
    radarNumero: 'text-orange-600',
    radarIcone: 'text-orange-600',
    radarTexto: 'text-zinc-800',
  },

  // Página de Contextos
  contextos: {
    cabecalhoTitulo: 'text-zinc-700',
    cabecalhoSubtitulo: 'text-zinc-500',
    divisor: 'border-zinc-200',
    linhaHover: 'hover:bg-zinc-100',
    setaIcone: 'text-zinc-500',
    pastaAbertaIcone: 'text-amber-500',
    pastaFechadaIcone: 'text-zinc-400',
    pastaNome: 'text-zinc-800',
    contador: 'text-zinc-400',
    addBtn: 'text-zinc-400 hover:text-zinc-800',
    bordaArvore: 'border-zinc-200',

    tarefaBg: 'bg-white',
    tarefaBorder: 'border-zinc-200 hover:border-zinc-300',
    tarefaTexto: 'text-zinc-800',
    tarefaIcone: 'text-zinc-500',

    rotinaBg: 'bg-purple-50/60',
    rotinaBorder: 'border-purple-200 hover:border-purple-300',
    rotinaTexto: 'text-purple-950',
    rotinaIcone: 'text-purple-600',

    concluidaBg: 'bg-zinc-100/70 border-zinc-200 opacity-40',
    concluidaTexto: 'line-through text-zinc-400',

    checkInativo: 'text-zinc-400 hover:text-emerald-600',
    checkAtivo: 'text-emerald-600',
    horarioTexto: 'text-zinc-500',
    editarBtn: 'text-zinc-400 hover:text-zinc-800',
    excluirBtn: 'text-zinc-400 hover:text-rose-600',

    p1: 'bg-rose-100 text-rose-700 border-rose-300',
    p2: 'bg-amber-100 text-amber-700 border-amber-300',
    p3: 'bg-zinc-100 text-zinc-600 border-zinc-300',
  },
};