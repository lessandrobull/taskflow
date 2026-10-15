import React, { useState, useEffect } from 'react';
import {
  Folder,
  FolderOpen,
  CaretRight,
  CaretDown,
  Plus,
  Check,
  PencilSimple,
  Trash,
  X,
} from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { processarInputRapido } from '../utils/parser';
import { construirArvoreContextos } from '../utils/tree';
import { PRIORIDADES, TIPOS_TAREFA } from '../types';
import { THEME } from '../colors';

const PASTAS_STORAGE_KEY = 'taskflow_pastas_abertas_v1';

function NoPasta({
  no,
  pastasAbertas,
  togglePasta,
  onAdicionarNaPasta,
  alternarPrioridade,
  onEditarTarefa,
  onRemoverTarefa,
}) {
  const [novoTexto, setNovoTexto] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState('');

  const temFilhos = Object.keys(no.filhos).length > 0;
  const temTarefas = no.tarefas.length > 0;
  const aberta = pastasAbertas[no.caminhoCompleto] ?? true;

  const handleCriarItem = (e) => {
    e.preventDefault();
    if (!novoTexto.trim()) return;

    const parsed = processarInputRapido(novoTexto.trim());
    if (!parsed || !parsed.titulo) return;

    onAdicionarNaPasta({
      ...parsed,
      contexto: parsed.contexto !== 'geral' ? parsed.contexto : no.caminhoCompleto,
    });

    setNovoTexto('');
    setMostrarInput(false);
  };

  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa.id);
    setTextoEdicao(tarefa.titulo);
  };

  const salvarEdicao = (id) => {
    if (textoEdicao.trim()) {
      const parsed = processarInputRapido(textoEdicao.trim());
      if (parsed && parsed.titulo) {
        onEditarTarefa(id, {
          titulo: parsed.titulo,
          icone: parsed.icone !== 'Circle' ? parsed.icone : undefined,
          tipo: parsed.tipo,
          horario: parsed.horario,
          cadencia: parsed.cadencia,
          proximaData: parsed.proximaData,
          contexto: parsed.contexto !== 'geral' ? parsed.contexto : undefined,
        });
      } else {
        onEditarTarefa(id, { titulo: textoEdicao.trim() });
      }
    }
    setEditandoId(null);
    setTextoEdicao('');
  };

  const getBadgePrioridade = (tarefa) => {
    const p = tarefa.prioridade;
    if (tarefa.tipo === TIPOS_TAREFA.CADENCIA) {
      if (p === PRIORIDADES.P1) return THEME.rotina.p1;
      if (p === PRIORIDADES.P2) return THEME.rotina.p2;
      return THEME.rotina.p3;
    }
    if (p === PRIORIDADES.P1) return THEME.foco.p1;
    if (p === PRIORIDADES.P2) return THEME.foco.p2;
    return THEME.foco.p3;
  };

  // Subpastas ordenadas alfabeticamente
  const subpastasOrdenadas = Object.values(no.filhos).sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  return (
    <div className="space-y-1">
      <div className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors group ${THEME.contextos.linhaHover}`}>
        <button
          onClick={() => togglePasta(no.caminhoCompleto)}
          className="flex items-center gap-2 flex-1 text-left min-w-0"
        >
          {temFilhos || temTarefas ? (
            aberta ? (
              <CaretDown size={12} weight="bold" className={THEME.contextos.setaIcone} />
            ) : (
              <CaretRight size={12} weight="bold" className={THEME.contextos.setaIcone} />
            )
          ) : (
            <span className="w-3" />
          )}

          {aberta ? (
            <FolderOpen size={16} weight="regular" className={THEME.contextos.pastaAbertaIcone} />
          ) : (
            <Folder size={16} weight="regular" className={THEME.contextos.pastaFechadaIcone} />
          )}

          <span className={`text-xs font-semibold capitalize truncate ${THEME.contextos.pastaNome}`}>
            {no.nome}
          </span>

          <span className={`text-[10px] font-mono font-medium ${THEME.contextos.contador}`}>
            ({no.tarefas.length})
          </span>
        </button>

        <button
          onClick={() => setMostrarInput(!mostrarInput)}
          className={`opacity-0 group-hover:opacity-100 p-1 transition-opacity ${THEME.contextos.addBtn}`}
          title="Nova tarefa nesta pasta"
        >
          <Plus size={13} weight="bold" />
        </button>
      </div>

      {aberta && (
        <div className={`pl-4 ml-2 border-l space-y-2 pt-1 ${THEME.contextos.bordaArvore}`}>
          {mostrarInput && (
            <form onSubmit={handleCriarItem} className="flex items-center gap-2 pr-2 my-1">
              <input
                type="text"
                autoFocus
                value={novoTexto}
                onChange={(e) => setNovoTexto(e.target.value)}
                placeholder={`Ação em "${no.nome}"...`}
                className={`flex-1 rounded-lg px-2.5 py-1 text-xs focus:outline-none ${THEME.quickInput.bg} ${THEME.quickInput.border} ${THEME.quickInput.text} ${THEME.quickInput.placeholder} ${THEME.quickInput.borderFocus}`}
              />
              <button
                type="submit"
                disabled={!novoTexto.trim()}
                className={`p-1 rounded disabled:opacity-30 ${THEME.foco.concluirBtn}`}
              >
                <Plus size={12} weight="bold" />
              </button>
            </form>
          )}

          {temTarefas && (
            <div className="space-y-1.5 pr-2">
              {no.tarefas.map((tarefa) => {
                const ehRotina = tarefa.tipo === TIPOS_TAREFA.CADENCIA;
                const ehAgendado = tarefa.tipo === TIPOS_TAREFA.AGENDADO;

                const estiloCard = tarefa.concluido
                  ? THEME.contextos.concluidaBg
                  : ehAgendado
                  ? `${THEME.contextos.agendaBg} ${THEME.contextos.agendaBorder}`
                  : ehRotina
                  ? `${THEME.contextos.rotinaBg} ${THEME.contextos.rotinaBorder}`
                  : `${THEME.contextos.tarefaBg} ${THEME.contextos.tarefaBorder}`;

                const estiloTexto = tarefa.concluido
                  ? THEME.contextos.concluidaTexto
                  : ehAgendado
                  ? THEME.contextos.agendaTexto
                  : ehRotina
                  ? THEME.contextos.rotinaTexto
                  : THEME.contextos.tarefaTexto;

                const estiloIcone = ehAgendado
                  ? THEME.contextos.agendaIcone
                  : ehRotina
                  ? THEME.contextos.rotinaIcone
                  : THEME.contextos.tarefaIcone;

                return (
                  <div
                    key={tarefa.id}
                    className={`flex items-center justify-between p-2 rounded-lg border transition-all shadow-sm ${estiloCard}`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                      {tarefa.icone && (
                        <DynamicIcon
                          name={ehAgendado ? (tarefa.icone || 'Clock') : tarefa.icone}
                          size={15}
                          className={`shrink-0 ${estiloIcone}`}
                        />
                      )}

                      {editandoId === tarefa.id ? (
                        <div className="flex items-center gap-1 flex-1">
                          <input
                            type="text"
                            autoFocus
                            value={textoEdicao}
                            onChange={(e) => setTextoEdicao(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') salvarEdicao(tarefa.id);
                              if (e.key === 'Escape') setEditandoId(null);
                            }}
                            className={`flex-1 rounded px-1.5 py-0.5 text-xs border focus:outline-none ${THEME.contextos.tarefaBg} ${THEME.contextos.tarefaTexto} ${THEME.quickInput.border}`}
                          />
                          <button
                            onClick={() => salvarEdicao(tarefa.id)}
                            className="p-1 text-emerald-600 hover:text-emerald-700"
                            title="Salvar edição"
                          >
                            <Check size={13} weight="bold" />
                          </button>
                          <button
                            onClick={() => setEditandoId(null)}
                            className="p-1 text-zinc-400 hover:text-zinc-700"
                            title="Cancelar edição"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className={`text-xs truncate font-medium ${estiloTexto}`}>
                          {tarefa.titulo}
                        </span>
                      )}

                      {tarefa.horario && (
                        <span className={`text-[10px] font-mono shrink-0 ${THEME.contextos.horarioTexto}`}>
                          @{tarefa.horario}
                        </span>
                      )}
                    </div>

                    {editandoId !== tarefa.id && (
                      <div className="flex items-center gap-1 shrink-0">
                        {!tarefa.concluido && !ehAgendado && (
                          <button
                            onClick={() => alternarPrioridade(tarefa.id)}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono border uppercase tracking-wider ${getBadgePrioridade(tarefa)}`}
                            title="Clique para alternar prioridade"
                          >
                            {tarefa.prioridade}
                          </button>
                        )}

                        <button
                          onClick={() => iniciarEdicao(tarefa)}
                          className={`p-1 transition-colors ${THEME.contextos.editarBtn}`}
                          title="Editar tarefa"
                        >
                          <PencilSimple size={13} />
                        </button>

                        <button
                          onClick={() => onRemoverTarefa(tarefa.id)}
                          className={`p-1 transition-colors ${THEME.contextos.excluirBtn}`}
                          title="Excluir tarefa"
                        >
                          <Trash size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {temFilhos && (
            <div className="space-y-1 pt-1">
              {subpastasOrdenadas.map((subNo) => (
                <NoPasta
                  key={subNo.caminhoCompleto}
                  no={subNo}
                  pastasAbertas={pastasAbertas}
                  togglePasta={togglePasta}
                  onAdicionarNaPasta={onAdicionarNaPasta}
                  alternarPrioridade={alternarPrioridade}
                  onEditarTarefa={onEditarTarefa}
                  onRemoverTarefa={onRemoverTarefa}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContextsView({
  tarefas,
  adicionarTarefa,
  alternarPrioridade,
  editarTarefa,
  removerTarefa,
}) {
  const [pastasAbertas, setPastasAbertas] = useState(() => {
    try {
      const salvas = localStorage.getItem(PASTAS_STORAGE_KEY);
      return salvas ? JSON.parse(salvas) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PASTAS_STORAGE_KEY, JSON.stringify(pastasAbertas));
    } catch (e) {
      console.error('Falha ao persistir pastas:', e);
    }
  }, [pastasAbertas]);

  const arvore = construirArvoreContextos(tarefas);

  // Pasta 'agenda' sempre no topo; demais pastas em ordem alfabética
  const pastasPrincipais = Object.values(arvore.filhos).sort((a, b) => {
    if (a.nome === 'agenda') return -1;
    if (b.nome === 'agenda') return 1;
    return a.nome.localeCompare(b.nome);
  });

  const togglePasta = (caminho) => {
    setPastasAbertas((prev) => {
      const estadoAtual = prev[caminho] ?? true;
      return {
        ...prev,
        [caminho]: !estadoAtual,
      };
    });
  };

  return (
    <div className="space-y-4 pb-24">
      <div className={`flex items-center justify-between pb-2 border-b ${THEME.contextos.divisor}`}>
        <div>
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.contextos.cabecalhoTitulo}`}>
            Árvore de Contextos
          </h2>
          <p className={`text-[11px] font-medium ${THEME.contextos.cabecalhoSubtitulo}`}>
            Gerencie pastas, rotinas periódicas e tarefas
          </p>
        </div>
      </div>

      {pastasPrincipais.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">
          Nenhum contexto criado ainda. Crie tarefas com #[pasta/subpasta] no topo.
        </div>
      ) : (
        <div className="space-y-2">
          {pastasPrincipais.map((no) => (
            <NoPasta
              key={no.caminhoCompleto}
              no={no}
              pastasAbertas={pastasAbertas}
              togglePasta={togglePasta}
              onAdicionarNaPasta={adicionarTarefa}
              alternarPrioridade={alternarPrioridade}
              onEditarTarefa={editarTarefa}
              onRemoverTarefa={removerTarefa}
            />
          ))}
        </div>
      )}
    </div>
  );
}
