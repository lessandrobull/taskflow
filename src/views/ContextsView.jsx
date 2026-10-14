import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  CaretRight,
  CaretDown,
  Plus,
  Check,
} from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { construirArvoreContextos } from '../utils/tree';
import { PRIORIDADES } from '../types';

// Componente recursivo para renderizar pastas e subníveis
function NoPasta({
  no,
  pastasAbertas,
  togglePasta,
  onConcluir,
  onAdicionarNaPasta,
  alternarPrioridade,
}) {
  const [novoTexto, setNovoTexto] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);

  const temFilhos = Object.keys(no.filhos).length > 0;
  const temTarefas = no.tarefas.length > 0;
  const aberta = pastasAbertas[no.caminhoCompleto] ?? true; // Abertas por padrão

  const handleCriarItem = (e) => {
    e.preventDefault();
    if (!novoTexto.trim()) return;

    onAdicionarNaPasta({
      titulo: novoTexto.trim(),
      contexto: no.caminhoCompleto,
    });

    setNovoTexto('');
    setMostrarInput(false);
  };

  const getBadgePrioridade = (p) => {
    switch (p) {
      case PRIORIDADES.P1:
        return 'bg-rose-950/40 text-rose-300 border-rose-900/50';
      case PRIORIDADES.P2:
        return 'bg-amber-950/40 text-amber-300 border-amber-900/50';
      default:
        return 'bg-zinc-800/40 text-zinc-400 border-zinc-700/50';
    }
  };

  return (
    <div className="space-y-1">
      {/* Linha do Cabeçalho da Pasta */}
      <div className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-zinc-900/60 transition-colors group">
        <button
          onClick={() => togglePasta(no.caminhoCompleto)}
          className="flex items-center gap-2 flex-1 text-left min-w-0"
        >
          {temFilhos || temTarefas ? (
            aberta ? (
              <CaretDown size={12} weight="bold" className="text-zinc-500" />
            ) : (
              <CaretRight size={12} weight="bold" className="text-zinc-500" />
            )
          ) : (
            <span className="w-3" />
          )}

          {aberta ? (
            <FolderOpen size={16} weight="fill" className="text-zinc-400" />
          ) : (
            <Folder size={16} weight="regular" className="text-zinc-500" />
          )}

          <span className="text-xs font-medium text-zinc-200 capitalize truncate">
            {no.nome}
          </span>

          <span className="text-[10px] text-zinc-600 font-mono">
            ({no.tarefas.length})
          </span>
        </button>

        {/* Botão rápido para criar tarefa dentro desta pasta */}
        <button
          onClick={() => setMostrarInput(!mostrarInput)}
          className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-zinc-100 transition-opacity"
          title="Nova tarefa nesta pasta"
        >
          <Plus size={13} weight="bold" />
        </button>
      </div>

      {/* Conteúdo Expansível (Subpastas e Tarefas) */}
      {aberta && (
        <div className="pl-4 ml-2 border-l border-zinc-800/60 space-y-2 pt-1">
          {/* Input rápido embutido na pasta */}
          {mostrarInput && (
            <form onSubmit={handleCriarItem} className="flex items-center gap-2 pr-2 my-1">
              <input
                type="text"
                autoFocus
                value={novoTexto}
                onChange={(e) => setNovoTexto(e.target.value)}
                placeholder={`Ação em "${no.nome}"...`}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!novoTexto.trim()}
                className="p-1 rounded bg-zinc-100 text-zinc-950 disabled:opacity-30"
              >
                <Plus size={12} weight="bold" />
              </button>
            </form>
          )}

          {/* Lista de Tarefas da Pasta (Sem tags, apenas ícone e ação) */}
          {temTarefas && (
            <div className="space-y-1.5 pr-2">
              {no.tarefas.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                    tarefa.concluido
                      ? 'bg-zinc-950/40 border-zinc-900 opacity-40'
                      : 'bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                    <button
                      onClick={() => onConcluir(tarefa.id)}
                      className={`p-1 rounded transition-colors ${
                        tarefa.concluido
                          ? 'text-emerald-500'
                          : 'text-zinc-600 hover:text-emerald-400'
                      }`}
                    >
                      <Check size={14} weight="bold" />
                    </button>

                    <DynamicIcon
                      name={tarefa.icone}
                      size={15}
                      className="text-zinc-400 shrink-0"
                    />

                    <span
                      className={`text-xs truncate ${
                        tarefa.concluido
                          ? 'line-through text-zinc-500'
                          : 'text-zinc-200'
                      }`}
                    >
                      {tarefa.titulo}
                    </span>
                  </div>

                  {!tarefa.concluido && (
                    <button
                      onClick={() => alternarPrioridade(tarefa.id)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono border uppercase tracking-wider ${getBadgePrioridade(
                        tarefa.prioridade
                      )}`}
                    >
                      {tarefa.prioridade}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Renderização de Subpastas (Recursão) */}
          {temFilhos && (
            <div className="space-y-1 pt-1">
              {Object.values(no.filhos).map((subNo) => (
                <NoPasta
                  key={subNo.caminhoCompleto}
                  no={subNo}
                  pastasAbertas={pastasAbertas}
                  togglePasta={togglePasta}
                  onConcluir={onConcluir}
                  onAdicionarNaPasta={onAdicionarNaPasta}
                  alternarPrioridade={alternarPrioridade}
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
  toggleConcluir,
  adicionarTarefa,
  alternarPrioridade,
}) {
  const [pastasAbertas, setPastasAbertas] = useState({});

  const arvore = construirArvoreContextos(tarefas);
  const pastasPrincipais = Object.values(arvore.filhos);

  const togglePasta = (caminho) => {
    setPastasAbertas((prev) => ({
      ...prev,
      [caminho]: !(prev[caminho] ?? true),
    }));
  };

  const handleAdicionarDireto = ({ titulo, contexto }) => {
    adicionarTarefa({
      titulo,
      contexto,
      tipo: 'foco',
      prioridade: 'p2',
    });
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div>
          <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
            Árvore de Contextos
          </h2>
          <p className="text-[11px] text-zinc-500">
            Navegue por setores e adicione tarefas sem poluição visual
          </p>
        </div>
      </div>

      {pastasPrincipais.length === 0 ? (
        <div className="text-center py-16 text-zinc-600 text-xs">
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
              onConcluir={toggleConcluir}
              onAdicionarNaPasta={handleAdicionarDireto}
              alternarPrioridade={alternarPrioridade}
            />
          ))}
        </div>
      )}
    </div>
  );
}