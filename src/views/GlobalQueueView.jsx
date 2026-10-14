import React from 'react';
import { CaretUp, CaretDown, Check, Lightning } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA, PRIORIDADES } from '../types';

export default function GlobalQueueView({
  tarefas,
  toggleConcluir,
  moverParaCima,
  moverParaBaixo,
  alternarPrioridade,
}) {
  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => a.ordemFila - b.ordemFila);

  // Estilos semânticos da ficha técnica de paletas
  const getBadgePrioridade = (p) => {
    switch (p) {
      case PRIORIDADES.P1:
        return 'bg-rose-950/40 text-rose-300 border-rose-900/50';
      case PRIORIDADES.P2:
        return 'bg-amber-950/40 text-amber-300 border-amber-900/50';
      case PRIORIDADES.P3:
      default:
        return 'bg-zinc-800/40 text-zinc-400 border-zinc-700/50';
    }
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div>
          <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
            Fila Global de Foco
          </h2>
          <p className="text-[11px] text-zinc-500">
            Os 3 primeiros alimentam a tela Hoje em tempo real
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          {filaFoco.length} {filaFoco.length === 1 ? 'tarefa' : 'tarefas'}
        </span>
      </div>

      {filaFoco.length === 0 ? (
        <div className="text-center py-16 text-zinc-600 text-xs">
          Nenhuma tarefa na fila de foco. Adicione uma no topo.
        </div>
      ) : (
        <div className="space-y-2">
          {filaFoco.map((item, index) => {
            const isFocoPrincipal = index === 0;
            const isRadar = index === 1 || index === 2;

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isFocoPrincipal
                    ? 'bg-zinc-900 border-zinc-700 shadow-sm'
                    : 'bg-zinc-900/50 border-zinc-800/70 hover:border-zinc-700'
                }`}
              >
                {/* Lado Esquerdo: Posição, Ícone e Ação */}
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 w-6 text-zinc-500 font-mono text-xs">
                    {isFocoPrincipal ? (
                      <Lightning size={14} weight="fill" className="text-amber-400" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  <DynamicIcon
                    name={item.icone}
                    size={18}
                    className={isFocoPrincipal ? 'text-zinc-100' : 'text-zinc-400'}
                  />

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs truncate ${
                        isFocoPrincipal
                          ? 'font-medium text-zinc-100'
                          : 'text-zinc-300'
                      }`}
                    >
                      {item.titulo}
                    </p>
                    {isRadar && (
                      <span className="text-[10px] text-zinc-500 block">
                        Radar Hoje ({index + 1}º)
                      </span>
                    )}
                  </div>
                </div>

                {/* Lado Direito: Prioridade e Botões de Posição */}
                <div className="flex items-center gap-2">
                  {/* Botão de Prioridade Cíclica */}
                  <button
                    onClick={() => alternarPrioridade(item.id)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider transition-colors ${getBadgePrioridade(
                      item.prioridade
                    )}`}
                    title="Clique para mudar prioridade"
                  >
                    {item.prioridade.toUpperCase()}
                  </button>

                  {/* Controles de Subir / Descer */}
                  <div className="flex flex-col gap-0.5 border-l border-zinc-800 pl-2">
                    <button
                      onClick={() => moverParaCima(item.id)}
                      disabled={index === 0}
                      className="p-1 text-zinc-400 hover:text-zinc-100 disabled:opacity-20 transition-colors"
                      title="Mover para cima"
                    >
                      <CaretUp size={12} weight="bold" />
                    </button>
                    <button
                      onClick={() => moverParaBaixo(item.id)}
                      disabled={index === filaFoco.length - 1}
                      className="p-1 text-zinc-400 hover:text-zinc-100 disabled:opacity-20 transition-colors"
                      title="Mover para baixo"
                    >
                      <CaretDown size={12} weight="bold" />
                    </button>
                  </div>

                  {/* Concluir direto da Fila */}
                  <button
                    onClick={() => toggleConcluir(item.id)}
                    className="p-1.5 ml-1 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
                    title="Marcar como concluída"
                  >
                    <Check size={14} weight="bold" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}