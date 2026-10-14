import { useState, useEffect } from 'react';
import { DADOS_INICIAIS, TIPOS_TAREFA, PRIORIDADES } from './types';
import { buscarEventosHoje } from './services/calendar';

const STORAGE_KEY = 'taskflow_tarefas_v1';

function formatarDataISO(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function useTasks() {
  const [tarefas, setTarefas] = useState(() => {
    try {
      const salvas = localStorage.getItem(STORAGE_KEY);
      return salvas ? JSON.parse(salvas) : DADOS_INICIAIS;
    } catch {
      return DADOS_INICIAIS;
    }
  });

  const [sincronizandoAgenda, setSincronizandoAgenda] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (err) {
      console.error('Falha ao gravar no localStorage:', err);
    }
  }, [tarefas]);

  const sincronizarAgenda = async () => {
    setSincronizandoAgenda(true);
    try {
      const eventos = await buscarEventosHoje();
      if (eventos.length > 0) {
        setTarefas((prev) => {
          const idsExistentes = new Set(prev.map((t) => t.id));

          const novosItens = eventos
            .filter((ev) => !idsExistentes.has(`gcal-${ev.id}`))
            .map((ev) => {
              const ehAula = /aula|aluno|ensino|class/i.test(ev.titulo);
              return {
                id: `gcal-${ev.id}`,
                titulo: ev.titulo,
                icone: ehAula ? 'ChalkboardTeacher' : 'Calendar',
                contexto: ehAula ? 'aulas/particulares' : 'agenda/pessoal',
                tipo: TIPOS_TAREFA.AGENDADO,
                horario: ev.horario,
                cadencia: null,
                proximaData: null,
                prioridade: PRIORIDADES.P1,
                ordemFila: 0,
                concluido: false,
                concluidoEm: null,
              };
            });

          return [...novosItens, ...prev];
        });
      }
    } finally {
      setSincronizandoAgenda(false);
    }
  };

  useEffect(() => {
    sincronizarAgenda();
  }, []);

  const toggleConcluir = (id) => {
    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        // Se for Rotina: ao concluir, recalcula o próximo ciclo e reseta para a data futura
        if (t.tipo === TIPOS_TAREFA.CADENCIA) {
          const intervalo = t.cadencia?.intervaloDias || 7;
          const proxima = new Date();
          proxima.setDate(proxima.getDate() + intervalo);

          return {
            ...t,
            concluido: false,
            proximaData: formatarDataISO(proxima),
            concluidoEm: new Date().toISOString(),
          };
        }

        // Tarefas de Foco normais
        const novoConcluido = !t.concluido;
        return {
          ...t,
          concluido: novoConcluido,
          concluidoEm: novoConcluido ? new Date().toISOString() : null,
        };
      })
    );
  };

  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  const editarTarefa = (id, novosDados) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...novosDados } : t))
    );
  };

  const moverParaCima = (id) => {
    const fila = tarefas
      .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index <= 0) return;

    const itemAtual = fila[index];
    const itemAcima = fila[index - 1];

    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === itemAtual.id) return { ...t, ordemFila: itemAcima.ordemFila };
        if (t.id === itemAcima.id) return { ...t, ordemFila: itemAtual.ordemFila };
        return t;
      })
    );
  };

  const moverParaBaixo = (id) => {
    const fila = tarefas
      .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index === -1 || index >= fila.length - 1) return;

    const itemAtual = fila[index];
    const itemAbaixo = fila[index + 1];

    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === itemAtual.id) return { ...t, ordemFila: itemAbaixo.ordemFila };
        if (t.id === itemAbaixo.id) return { ...t, ordemFila: itemAtual.ordemFila };
        return t;
      })
    );
  };

  const alternarPrioridade = (id) => {
    const ciclo = {
      [PRIORIDADES.P1]: PRIORIDADES.P2,
      [PRIORIDADES.P2]: PRIORIDADES.P3,
      [PRIORIDADES.P3]: PRIORIDADES.P1,
    };

    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, prioridade: ciclo[t.prioridade] || PRIORIDADES.P2 } : t
      )
    );
  };

  const adicionarTarefa = ({
    titulo,
    icone = 'Circle',
    contexto = 'geral',
    tipo = TIPOS_TAREFA.FOCO,
    horario = null,
    cadencia = null,
    proximaData = null,
    prioridade = PRIORIDADES.P2,
  }) => {
    const nova = {
      id: `task-${Date.now()}`,
      titulo,
      icone,
      contexto,
      tipo,
      horario,
      cadencia,
      proximaData: proximaData || (tipo === TIPOS_TAREFA.CADENCIA ? formatarDataISO(new Date()) : null),
      prioridade,
      ordemFila: tarefas.filter((t) => t.tipo === TIPOS_TAREFA.FOCO).length + 1,
      concluido: false,
      concluidoEm: null,
    };

    setTarefas((prev) => [...prev, nova]);
  };

  return {
    tarefas,
    sincronizandoAgenda,
    sincronizarAgenda,
    toggleConcluir,
    removerTarefa,
    editarTarefa,
    moverParaCima,
    moverParaBaixo,
    alternarPrioridade,
    adicionarTarefa,
  };
}