import React, { useState } from 'react';
import { CaretUp, CaretDown, Check, Lightning } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA, PRIORIDADES } from '../types';
import { THEME } from '../colors';

export default function GlobalQueueView({
  tarefas,
  toggleConcluir,
  moverParaCima,
  moverParaBaixo,
  alternarPrioridade,
}) {
  const [subAba, setSubAba] = useState('foco'); // 'foco' | 'rotina'

  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const filaRotina = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.CADENCIA && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const filaAtiva = subAba === 'foco' ? filaFoco : filaRotina;

  const getBadgePrioridade = (p, tipo) => {
    if (tipo === TIPOS_TAREFA.CADENCIA) {
      if (p === PRIORIDADES.P1) return THEME.rotina.p1;
      if (p === PRIORIDADES.P2) return THEME.rotina.p2;
      return THEME.rotina.p3;
    }
    if (p === PRIORIDADES.P1) return THEME.foco.p1;
    if (p === PRIORIDADES.P2) return THEME.foco.p2;
    return THEME.foco.p3;
  };

  return (
    <div className="space-y-3 pb-24">
      {/* Seletor Superior: Foco | Rotina */}
      <div className="flex p-1 bg-zinc-100 rounded-lg border border-zinc-200">
        <button
          onClick={() => setSubAba('foco')}
          className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
            subAba === 'foco'
              ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200/80 font-bold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          Foco
        </button>
        <button
          onClick={() => setSubAba('rotina')}
          className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
            subAba === 'rotina'
              ? 'bg-white text-purple-800 shadow-sm border border-purple-200/80 font-bold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          Rotina
        </button>
      </div>

      {/* Subcabeçalho Informativo */}
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200">
        <div>
          <h2
            className={`text-xs uppercase tracking-wider font-bold ${
              subAba === 'foco' ? THEME.foco.titulo : THEME.rotina.titulo
            }`}
          >
            {subAba === 'foco' ? 'Fila de Foco' : 'Fila de Rotina'}
          </h2>
          <p className="text-[11px] text-zinc-500">
            {subAba === 'foco'
              ? 'Os 3 primeiros alimentam a tela Hoje em tempo real'
              : 'Organize os rituais por prioridade de execução'}
          </p>
        </div>
        <span className="text-xs font-mono font-medium text-zinc-500">
          {filaAtiva.length} {filaAtiva.length === 1 ? 'tarefa' : 'tarefas'}
        </span>
      </div>

      {/* Listagem da Fila */}
      {filaAtiva.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">
          {subAba === 'foco'
            ? 'Nenhuma tarefa na fila de foco.'
            : 'Nenhuma rotina pendente.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filaAtiva.map((item, index) => {
            const isPrincipal = index === 0;
            const isRadar = subAba === 'foco' && (index === 1 || index === 2);

            const estiloCard =
              subAba === 'foco'
                ? isPrincipal
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                  : 'bg-white border-zinc-200 hover:border-emerald-200 shadow-sm'
                : isPrincipal
                ? 'bg-purple-50/70 border-purple-300 shadow-sm'
                : 'bg-white border-zinc-200 hover:border-purple-200 shadow-sm';

            const corIcone =
              subAba === 'foco'
                ? isPrincipal
                  ? 'text-emerald-700'
                  : 'text-zinc-600'
                : isPrincipal
                ? 'text-purple-700'
                : 'text-zinc-600';

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${estiloCard}`}
              >
                {/* Lado Esquerdo: Posição, Ícone e Título */}
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-center w-5 font-mono text-xs shrink-0">
                    {isPrincipal ? (
                      <Lightning
                        size={15}
                        weight="fill"
                        className={
                          subAba === 'foco'
                            ? THEME.foco.raio
                            : 'text-purple-600'
                        }
                      />
                    ) : (
                      <span className="text-zinc-400 font-bold">{index + 1}</span>
                    )}
                  </div>

                  <DynamicIcon
                    name={item.icone}
                    size={18}
                    className={`shrink-0 ${corIcone}`}
                  />

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs truncate ${
                        isPrincipal
                          ? 'font-bold text-zinc-900'
                          : 'font-medium text-zinc-800'
                      }`}
                    >
                      {item.titulo}
                    </p>
                    {isRadar && (
                      <span className="text-[10px] text-emerald-700 font-medium block">
                        Radar Hoje ({index + 1}º)
                      </span>
                    )}
                    {subAba === 'rotina' && item.cadencia?.intervaloDias && (
                      <span className="text-[10px] text-purple-700 font-medium block">
                        A cada {item.cadencia.intervaloDias} dias
                        {item.horario ? ` • @${item.horario}` : ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* Lado Direito: Prioridade Cíclica e Controles */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alternarPrioridade(item.id)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider transition-colors ${getBadgePrioridade(
                      item.prioridade,
                      item.tipo
                    )}`}
                    title="Alternar prioridade (P1, P2, P3)"
                  >
                    {item.prioridade.toUpperCase()}
                  </button>

                  <div className="flex flex-col gap-0.5 border-l border-zinc-200 pl-2">
                    <button
                      onClick={() => moverParaCima(item.id)}
                      disabled={index === 0}
                      className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 transition-colors"
                      title="Mover para cima"
                    >
                      <CaretUp size={12} weight="bold" />
                    </button>
                    <button
                      onClick={() => moverParaBaixo(item.id)}
                      disabled={index === filaAtiva.length - 1}
                      className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 transition-colors"
                      title="Mover para baixo"
                    >
                      <CaretDown size={12} weight="bold" />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleConcluir(item.id)}
                    className={`p-1.5 ml-1 rounded-lg border border-transparent transition-colors ${
                      subAba === 'foco'
                        ? 'text-zinc-400 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200'
                        : 'text-zinc-400 hover:text-purple-700 hover:bg-purple-50 hover:border-purple-200'
                    }`}
                    title="Concluir tarefa"
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
