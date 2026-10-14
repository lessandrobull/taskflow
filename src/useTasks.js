import { useState, useEffect } from 'react';
import { DADOS_INICIAIS, TIPOS_TAREFA, PRIORIDADES } from './types';
import { buscarEventosHoje } from './services/calendar';
import { supabase } from './services/supabase';

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

  // Mantém backup no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (err) {
      console.error('Falha ao gravar no localStorage:', err);
    }
  }, [tarefas]);

  // Carrega dados iniciais do Supabase e assina mudanças em tempo real
  useEffect(() => {
    async function carregarDoSupabase() {
      const { data, error } = await supabase.from('tarefas').select('*');
      if (!error && data && data.length > 0) {
        setTarefas(data);
      } else if (!error && data && data.length === 0) {
        // Se a tabela estiver vazia, sobe os dados locais para o banco
        const locais = (() => {
          try {
            const s = localStorage.getItem(STORAGE_KEY);
            return s ? JSON.parse(s) : DADOS_INICIAIS;
          } catch {
            return DADOS_INICIAIS;
          }
        })();
        if (locais.length > 0) {
          await supabase.from('tarefas').upsert(locais);
        }
      }
    }

    carregarDoSupabase();

    // Inscrição em tempo real (Realtime Channel)
    const canal = supabase
      .channel('tarefas-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tarefas' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTarefas((prev) => {
              if (prev.some((t) => t.id === payload.new.id)) return prev;
              return [...prev, payload.new];
            });
          } else if (payload.eventType === 'UPDATE') {
            setTarefas((prev) =>
              prev.map((t) => (t.id === payload.new.id ? payload.new : t))
            );
          } else if (payload.eventType === 'DELETE') {
            setTarefas((prev) => prev.filter((t) => t.id === payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

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

          if (novosItens.length > 0) {
            supabase.from('tarefas').upsert(novosItens).catch(console.error);
          }

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
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    let atualizacao = {};

    if (itemAtual.tipo === TIPOS_TAREFA.CADENCIA) {
      const intervalo = itemAtual.cadencia?.intervaloDias || 7;
      const proxima = new Date();
      proxima.setDate(proxima.getDate() + intervalo);

      atualizacao = {
        concluido: false,
        proximaData: formatarDataISO(proxima),
        concluidoEm: new Date().toISOString(),
      };
    } else {
      const novoConcluido = !itemAtual.concluido;
      atualizacao = {
        concluido: novoConcluido,
        concluidoEm: novoConcluido ? new Date().toISOString() : null,
      };
    }

    const tarefaAtualizada = { ...itemAtual, ...atualizacao };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    supabase.from('tarefas').upsert(tarefaAtualizada).catch(console.error);
  };

  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
    supabase.from('tarefas').delete().eq('id', id).catch(console.error);
  };

  const editarTarefa = (id, novosDados) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const tarefaAtualizada = { ...itemAtual, ...novosDados };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    supabase.from('tarefas').upsert(tarefaAtualizada).catch(console.error);
  };

  const moverParaCima = (id) => {
    const fila = tarefas
      .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index <= 0) return;

    const itemAtual = fila[index];
    const itemAcima = fila[index - 1];

    const atual1 = { ...itemAtual, ordemFila: itemAcima.ordemFila };
    const atual2 = { ...itemAcima, ordemFila: itemAtual.ordemFila };

    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === itemAtual.id) return atual1;
        if (t.id === itemAcima.id) return atual2;
        return t;
      })
    );

    supabase.from('tarefas').upsert([atual1, atual2]).catch(console.error);
  };

  const moverParaBaixo = (id) => {
    const fila = tarefas
      .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index === -1 || index >= fila.length - 1) return;

    const itemAtual = fila[index];
    const itemAbaixo = fila[index + 1];

    const atual1 = { ...itemAtual, ordemFila: itemAbaixo.ordemFila };
    const atual2 = { ...itemAbaixo, ordemFila: itemAtual.ordemFila };

    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === itemAtual.id) return atual1;
        if (t.id === itemAbaixo.id) return atual2;
        return t;
      })
    );

    supabase.from('tarefas').upsert([atual1, atual2]).catch(console.error);
  };

  const alternarPrioridade = (id) => {
    const ciclo = {
      [PRIORIDADES.P1]: PRIORIDADES.P2,
      [PRIORIDADES.P2]: PRIORIDADES.P3,
      [PRIORIDADES.P3]: PRIORIDADES.P1,
    };

    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const tarefaAtualizada = {
      ...itemAtual,
      prioridade: ciclo[itemAtual.prioridade] || PRIORIDADES.P2,
    };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    supabase.from('tarefas').upsert(tarefaAtualizada).catch(console.error);
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
      proximaData:
        proximaData ||
        (tipo === TIPOS_TAREFA.CADENCIA ? formatarDataISO(new Date()) : null),
      prioridade,
      ordemFila: tarefas.filter((t) => t.tipo === TIPOS_TAREFA.FOCO).length + 1,
      concluido: false,
      concluidoEm: null,
    };

    setTarefas((prev) => [...prev, nova]);
    supabase.from('tarefas').insert(nova).catch(console.error);
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