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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (err) {
      console.error('Falha ao gravar no localStorage:', err);
    }
  }, [tarefas]);

  useEffect(() => {
    async function carregarDoSupabase() {
      try {
        const { data, error } = await supabase.from('tarefas').select('*');
        if (!error && data && data.length > 0) {
          setTarefas(data);
        } else if (!error && data && data.length === 0) {
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
      } catch (err) {
        console.error('Erro ao carregar dados do Supabase:', err);
      }
    }

    carregarDoSupabase();

    const canal = supabase
      .channel('tarefas-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tarefas' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTarefas((prev) => {
              if (prev.some((t) => t.id === payload.new?.id)) return prev;
              return payload.new ? [...prev, payload.new] : prev;
            });
          } else if (payload.eventType === 'UPDATE') {
            if (payload.new?.id) {
              setTarefas((prev) =>
                prev.map((t) => (t.id === payload.new.id ? payload.new : t))
              );
            }
          } else if (payload.eventType === 'DELETE') {
            if (payload.old?.id) {
              setTarefas((prev) => prev.filter((t) => t.id !== payload.old.id));
            }
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
            .map((ev) => ({
              id: `gcal-${ev.id}`,
              titulo: ev.titulo,
              icone: 'Clock',
              contexto: 'agenda',
              tipo: TIPOS_TAREFA.AGENDADO,
              horario: ev.horario,
              cadencia: null,
              proximaData: null,
              prioridade: PRIORIDADES.P1,
              ordemFila: 0,
              concluido: false,
              concluidoEm: null,
            }));

          if (novosItens.length > 0) {
            (async () => {
              try {
                await supabase.from('tarefas').upsert(novosItens);
              } catch (e) {
                console.error('Falha ao subir eventos para o Supabase:', e);
              }
            })();
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
      let novaDataInicio = null;
      let novaDataLimite = null;
      let proxima = new Date();

      if (itemAtual.cadencia?.dataInicio && itemAtual.cadencia?.dataLimite) {
        const dtIni = new Date(`${itemAtual.cadencia.dataInicio}T00:00:00`);
        const dtLim = new Date(`${itemAtual.cadencia.dataLimite}T00:00:00`);
        dtIni.setDate(dtIni.getDate() + intervalo);
        dtLim.setDate(dtLim.getDate() + intervalo);
        novaDataInicio = formatarDataISO(dtIni);
        novaDataLimite = formatarDataISO(dtLim);
        proxima = dtIni;
      } else {
        proxima.setDate(proxima.getDate() + intervalo);
      }

      const novaCadencia = itemAtual.cadencia
        ? {
            ...itemAtual.cadencia,
            ...(novaDataInicio && { dataInicio: novaDataInicio }),
            ...(novaDataLimite && { dataLimite: novaDataLimite }),
          }
        : null;

      atualizacao = {
        concluido: false,
        proximaData: formatarDataISO(proxima),
        cadencia: novaCadencia,
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

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao atualizar conclusao no Supabase:', e);
      }
    })();
  };

  const pularParaDepois = (id) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual || itemAtual.tipo !== TIPOS_TAREFA.FOCO) return;

    const filaFoco = tarefas
      .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    if (filaFoco.length <= 1) return;

    const maiorOrdem = filaFoco[filaFoco.length - 1].ordemFila || filaFoco.length;
    const tarefaAtualizada = {
      ...itemAtual,
      ordemFila: maiorOrdem + 1,
    };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao pular tarefa no Supabase:', e);
      }
    })();
  };

  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
    (async () => {
      try {
        await supabase.from('tarefas').delete().eq('id', id);
      } catch (e) {
        console.error('Falha ao remover tarefa no Supabase:', e);
      }
    })();
  };

  const limparConcluidos = () => {
    setTarefas((prev) => prev.filter((t) => !t.concluido));
    (async () => {
      try {
        await supabase.from('tarefas').delete().eq('concluido', true);
      } catch (e) {
        console.error('Falha ao limpar concluidas no Supabase:', e);
      }
    })();
  };

  const editarTarefa = (id, novosDados) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const tarefaAtualizada = { ...itemAtual, ...novosDados };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao editar tarefa no Supabase:', e);
      }
    })();
  };

  const moverParaCima = (id) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const fila = tarefas
      .filter((t) => t.tipo === itemAtual.tipo && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index <= 0) return;

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

    (async () => {
      try {
        await supabase.from('tarefas').upsert([atual1, atual2]);
      } catch (e) {
        console.error('Falha ao reordenar tarefa no Supabase:', e);
      }
    })();
  };

  const moverParaBaixo = (id) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const fila = tarefas
      .filter((t) => t.tipo === itemAtual.tipo && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index === -1 || index >= fila.length - 1) return;

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

    (async () => {
      try {
        await supabase.from('tarefas').upsert([atual1, atual2]);
      } catch (e) {
        console.error('Falha ao reordenar tarefa no Supabase:', e);
      }
    })();
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

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao alterar prioridade no Supabase:', e);
      }
    })();
  };

  const adicionarTarefa = ({
    titulo,
    icone = 'ClipboardText',
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
      ordemFila: tarefas.filter((t) => t.tipo === tipo).length + 1,
      concluido: false,
      concluidoEm: null,
    };

    setTarefas((prev) => [...prev, nova]);

    (async () => {
      try {
        await supabase.from('tarefas').insert(nova);
      } catch (e) {
        console.error('Falha ao inserir tarefa no Supabase:', e);
      }
    })();
  };

  return {
    tarefas,
    sincronizandoAgenda,
    sincronizarAgenda,
    toggleConcluir,
    pularParaDepois,
    removerTarefa,
    limparConcluidos,
    editarTarefa,
    moverParaCima,
    moverParaBaixo,
    alternarPrioridade,
    adicionarTarefa,
  };
}
