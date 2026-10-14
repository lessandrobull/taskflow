// Identificadores de Prioridade
export const PRIORIDADES = {
  P1: 'p1', // Urgente / Bloqueante
  P2: 'p2', // Fluxo normal / Estruturante
  P3: 'p3', // Leve / Oportunidade
};

// Tipos de Tarefas suportados pelo TaskFlow
export const TIPOS_TAREFA = {
  AGENDADO: 'agendado', // Hora marcada fixa
  CADENCIA: 'cadencia', // Rituais e hábitos repetitivos
  FOCO: 'foco',         // Tarefas avulsas da Fila Global
};

// Dados de exemplo para validar o comportamento dos blocos
export const DADOS_INICIAIS = [
  // 1. Bloco Agendados (Com horário rígido)
  {
    id: 'task-1',
    titulo: 'Dentista (Consulta periódica)',
    icone: 'Tooth',
    contexto: 'saude/consultas',
    tipo: TIPOS_TAREFA.AGENDADO,
    horario: '14:00',
    cadencia: null,
    prioridade: PRIORIDADES.P2,
    ordemFila: 0,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-2',
    titulo: 'Aula de Inglês (Mari)',
    icone: 'ChalkboardTeacher',
    contexto: 'aulas/particulares',
    tipo: TIPOS_TAREFA.AGENDADO,
    horario: '16:30',
    cadencia: null,
    prioridade: PRIORIDADES.P1,
    ordemFila: 0,
    concluido: false,
    concluidoEm: null,
  },

  // 2. Bloco Rituais & Cadências (Recorrentes)
  {
    id: 'task-3',
    titulo: 'Colocar o lixo para fora',
    icone: 'Trash',
    contexto: 'casa/manutencao',
    tipo: TIPOS_TAREFA.CADENCIA,
    horario: '06:00', // Horário limite para alerta de atraso
    cadencia: { frequencia: 'dias_especificos', dias: [2, 4, 6] },
    prioridade: PRIORIDADES.P2,
    ordemFila: 0,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-4',
    titulo: 'Robô aspirador e passar pano',
    icone: 'Broom',
    contexto: 'casa/limpeza',
    tipo: TIPOS_TAREFA.CADENCIA,
    horario: null,
    cadencia: { frequencia: 'diaria' },
    prioridade: PRIORIDADES.P3,
    ordemFila: 0,
    concluido: false,
    concluidoEm: null,
  },

  // 3. Fila de Foco (Ordenada manualmente)
  {
    id: 'task-5',
    titulo: 'QuizHub: Ajustar geração de quizzes',
    icone: 'Code',
    contexto: 'pc/desenvolvimento/quizhub',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P1,
    ordemFila: 1, // Card Principal em Hoje
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-6',
    titulo: 'Telhado: Colar pedaços das telhas e manta',
    icone: 'Hammer',
    contexto: 'casa/obras externas/telhado',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P1,
    ordemFila: 2, // Radar 1 em Hoje
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-7',
    titulo: 'HOS: Fatorar god component em módulos',
    icone: 'Cpu',
    contexto: 'pc/estudos/pos',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P2,
    ordemFila: 3, // Radar 2 em Hoje
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-8',
    titulo: 'Prateleiras no canto do jardim',
    icone: 'Wrench',
    contexto: 'casa/jardim',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P3,
    ordemFila: 4, // Disponível na Fila Global
    concluido: false,
    concluidoEm: null,
  },
];