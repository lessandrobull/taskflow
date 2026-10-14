import { useState, useEffect } from 'react';
import { DADOS_INICIAIS, TIPOS_TAREFA, PRIORIDADES } from './types';

const STORAGE_KEY = 'taskflow_tarefas_v1';

export function useTasks() {
  const [tarefas, setTarefas] = useState(() => {
    try {
      const salvas = localStorage.getItem(STORAGE_KEY);
      return salvas ? JSON.parse(salvas) : DADOS_INICIAIS;
    } catch {
      return DADOS_INICIAIS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (err) {
      console.error('Falha ao gravar no localStorage:', err);
    }
  }, [tarefas]);

  const toggleConcluir = (id) => {
    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const novoConcluido = !t.concluido;
          return {
            ...t,
            concluido: novoConcluido,
            concluidoEm: novoConcluido ? new Date().toISOString() : null,
          };
        }
        return t;
      })
    );
  };

  // Move um item uma posição acima na fila
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

  // Move um item uma posição abaixo na fila
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

  // Alterna ciclicamente a prioridade (P1 -> P2 -> P3 -> P1)
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
    prioridade = PRIORIDADES.P2,
  }) => {
    const nova = {
      id: `task-${Date.now()}`,
      titulo,
      icone,
      contexto,
      tipo,
      horario,
      cadencia: null,
      prioridade,
      ordemFila: tarefas.filter((t) => t.tipo === TIPOS_TAREFA.FOCO).length + 1,
      concluido: false,
      concluidoEm: null,
    };

    setTarefas((prev) => [...prev, nova]);
  };

  return {
    tarefas,
    toggleConcluir,
    moverParaCima,
    moverParaBaixo,
    alternarPrioridade,
    adicionarTarefa,
  };
}