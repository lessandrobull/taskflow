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

  // Bloco 1: Agenda (Azul Celeste)
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
    p1: 'bg-purple-100 text-purple-800 border-purple-300',
    p2: 'bg-purple-50 text-purple-700 border-purple-200',
    p3: 'bg-zinc-100 text-zinc-600 border-zinc-300',
  },

  // Bloco 3: Foco (Verde Esmeralda)
  foco: {
    titulo: 'text-emerald-800',
    principalBg: 'bg-emerald-50/70',
    principalBorder: 'border-emerald-300/80',
    principalIcone: 'text-emerald-800',
    principalTexto: 'text-zinc-900',
    principalDivisor: 'border-emerald-200',
    concluirBtn: 'bg-[#45818e] text-white hover:bg-[#386b76] border border-[#386b76]/80 shadow-sm',
    pularBtn: 'text-zinc-500 hover:text-zinc-800',
    vazioBg: 'bg-zinc-50 border-zinc-300 text-zinc-500',
    radarTitulo: 'text-zinc-500',
    radarBg: 'bg-emerald-50/40',
    radarBorder: 'border-emerald-200/80',
    radarNumero: 'text-emerald-700',
    radarIcone: 'text-emerald-700',
    radarTexto: 'text-zinc-800',
    raio: 'text-emerald-600',
    p1: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    p2: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    p3: 'bg-zinc-100 text-zinc-600 border-zinc-300',
  },

  // Página de Contextos
  contextos: {
    cabecalhoTitulo: 'text-zinc-700',
    cabecalhoSubtitulo: 'text-zinc-500',
    divisor: 'border-zinc-200',
    linhaHover: 'hover:bg-zinc-100',
    setaIcone: 'text-zinc-500',
    pastaAbertaIcone: 'text-zinc-400',
    pastaFechadaIcone: 'text-zinc-400',
    pastaNome: 'text-zinc-800',
    contador: 'text-zinc-400',
    addBtn: 'text-zinc-400 hover:text-zinc-800',
    bordaArvore: 'border-zinc-200',

    // Foco (Verde)
    tarefaBg: 'bg-emerald-50/40',
    tarefaBorder: 'border-emerald-200/80 hover:border-emerald-300',
    tarefaTexto: 'text-zinc-800',
    tarefaIcone: 'text-emerald-700',

    // Rotina (Violeta)
    rotinaBg: 'bg-purple-50/60',
    rotinaBorder: 'border-purple-200 hover:border-purple-300',
    rotinaTexto: 'text-purple-950',
    rotinaIcone: 'text-purple-600',

    // Agenda (Azul Celeste)
    agendaBg: 'bg-sky-50/60',
    agendaBorder: 'border-sky-200 hover:border-sky-300',
    agendaTexto: 'text-sky-950',
    agendaIcone: 'text-sky-600',

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

  // Página de Notas (Âmbar / Laranja)
  notas: {
    cabecalhoTitulo: 'text-amber-800',
    divisor: 'border-zinc-200',
    abaAtiva: 'bg-amber-50 text-amber-950 border-amber-300 shadow-sm font-bold',
    abaInativa: 'text-zinc-500 hover:text-zinc-800 border-zinc-200 bg-white',
    addBtn: 'text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100',
    editorBg: 'bg-amber-50/20',
    editorBorder: 'border-amber-200/90 focus:border-amber-400',
    editorTexto: 'text-zinc-900',
    editorPlaceholder: 'placeholder-zinc-400',
    cardLinhaBg: 'bg-white',
    cardLinhaBorder: 'border-zinc-200 hover:border-amber-300 shadow-sm',
    cardLinhaTexto: 'text-zinc-800',
    converterBtn: 'bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-300',
    msgSucesso: 'text-emerald-700 font-semibold',
  },
};
