import React, { useState } from 'react';
import { CaretUp, CaretDown, Check, Lightning, ArrowCounterClockwise, CheckCircle } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA, PRIORIDADES } from '../types';
import { THEME } from '../colors';

function ItemFila({
  item,
  index,
  total,
  subAba,
  alternarPrioridade,
  moverParaCima,
  moverParaBaixo,
  toggleConcluir,
  getBadgePrioridade,
}) {
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
    <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${estiloCard}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
        <div className="flex items-center justify-center w-5 font-mono text-xs shrink-0">
          {isPrincipal ? (
            <Lightning
              size={15}
              weight="fill"
              className={subAba === 'foco' ? THEME.foco.raio : 'text-purple-600'}
            />
          ) : (
            <span className="text-zinc-400 font-bold">{index + 1}</span>
          )}
        </div>

        <DynamicIcon name={item.icone} size={18} className={`shrink-0 ${corIcone}`} />

        <div className="flex-1 min-w-0">
          <p
            className={`text-xs truncate ${
              isPrincipal ? 'font-bold text-zinc-900' : 'font-medium text-zinc-800'
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

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => alternarPrioridade(item.id)}
          className={`px-1.5 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider transition-colors ${getBadgePrioridade(
            item.prioridade,
            item.tipo
          )}`}
          title="Alternar prioridade"
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
            disabled={index === total - 1}
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
}

function ItemConcluido({ item, toggleConcluir }) {
  const formatarHora = (isoStr) => {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 shadow-sm transition-all">
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
        <CheckCircle size={18} weight="fill" className="text-zinc-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs truncate font-medium text-zinc-400 line-through">
            {item.titulo}
          </p>
          <span className="text-[10px] text-zinc-400 block font-mono">
            Concluída {formatarHora(item.concluidoEm) ? `às ${formatarHora(item.concluidoEm)}` : ''}
            {item.contexto ? ` • #${item.contexto}` : ''}
          </span>
        </div>
      </div>

      <button
        onClick={() => toggleConcluir(item.id)}
        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors shrink-0"
        title="Desfazer conclusão"
      >
        <ArrowCounterClockwise size={14} weight="bold" />
      </button>
    </div>
  );
}

export default function GlobalQueueView({
  tarefas,
  toggleConcluir,
  moverParaCima,
  moverParaBaixo,
  alternarPrioridade,
}) {
  const [subAba, setSubAba] = useState('foco'); // 'foco' | 'rotina' | 'concluido'

  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const filaRotina = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.CADENCIA && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const filaConcluido = tarefas
    .filter((t) => t.concluido)
    .sort((a, b) => new Date(b.concluidoEm || 0) - new Date(a.concluidoEm || 0));

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
    <div className="h-full flex flex-col pb-24 lg:pb-6 overflow-hidden">
      {/* 1. SELETOR MOBILE (< lg): Foco | Rotina | Concluído */}
      <div className="flex p-1 bg-zinc-100 rounded-lg border border-zinc-200 mb-3 shrink-0 lg:hidden">
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
        <button
          onClick={() => setSubAba('concluido')}
          className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
            subAba === 'concluido'
              ? 'bg-white text-zinc-900 shadow-sm border border-zinc-300 font-bold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          Concluído
        </button>
      </div>

      {/* 2. VISUALIZAÇÃO MOBILE (Lista da sub-aba ativa) */}
      <div className="flex-1 flex flex-col min-h-0 lg:hidden">
        <div className="flex items-center justify-between pb-1 mb-2 border-b border-zinc-200 shrink-0">
          <div>
            <h2
              className={`text-xs uppercase tracking-wider font-bold ${
                subAba === 'foco'
                  ? THEME.foco.titulo
                  : subAba === 'rotina'
                  ? THEME.rotina.titulo
                  : 'text-zinc-600'
              }`}
            >
              {subAba === 'foco' && 'Fila de Foco'}
              {subAba === 'rotina' && 'Fila de Rotina'}
              {subAba === 'concluido' && 'Tarefas Concluídas'}
            </h2>
          </div>
          <span className="text-xs font-mono font-medium text-zinc-500">
            {subAba === 'foco' && `${filaFoco.length} tarefas`}
            {subAba === 'rotina' && `${filaRotina.length} rituais`}
            {subAba === 'concluido' && `${filaConcluido.length} concluídas`}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-0.5">
          {subAba === 'foco' &&
            (filaFoco.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa na fila de foco.</div>
            ) : (
              filaFoco.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaFoco.length}
                  subAba="foco"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            ))}

          {subAba === 'rotina' &&
            (filaRotina.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma rotina pendente.</div>
            ) : (
              filaRotina.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaRotina.length}
                  subAba="rotina"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            ))}

          {subAba === 'concluido' &&
            (filaConcluido.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa concluída ainda.</div>
            ) : (
              filaConcluido.map((item) => (
                <ItemConcluido key={item.id} item={item} toggleConcluir={toggleConcluir} />
              ))
            ))}
        </div>
      </div>

      {/* 3. VISUALIZAÇÃO DESKTOP: Coluna 1 Foco | Coluna 2 Rotina | Coluna 3 Concluído */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:h-full lg:min-h-0">
        {/* Coluna 1: Fila de Foco (Verde) */}
        <div className="flex flex-col h-full min-h-0 border-r border-zinc-200 pr-4">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 shrink-0">
            <div>
              <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.foco.titulo}`}>
                Fila de Foco
              </h2>
              <p className="text-[11px] text-zinc-500">
                Os 3 primeiros alimentam a tela Hoje
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-emerald-800">
              {filaFoco.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {filaFoco.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa na fila de foco.</div>
            ) : (
              filaFoco.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaFoco.length}
                  subAba="foco"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            )}
          </div>
        </div>

        {/* Coluna 2: Fila de Rotina (Violeta - no meio) */}
        <div className="flex flex-col h-full min-h-0 border-r border-zinc-200 pr-4">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 shrink-0">
            <div>
              <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.rotina.titulo}`}>
                Fila de Rotina
              </h2>
              <p className="text-[11px] text-zinc-500">
                Precedência dos rituais
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-purple-800">
              {filaRotina.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {filaRotina.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma rotina cadastrada.</div>
            ) : (
              filaRotina.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaRotina.length}
                  subAba="rotina"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            )}
          </div>
        </div>

        {/* Coluna 3: Concluído (Cinza - à direita de Rotina) */}
        <div className="flex flex-col h-full min-h-0">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 shrink-0">
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-600">
                Concluído
              </h2>
              <p className="text-[11px] text-zinc-500">
                Histórico em ordem de finalização
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-zinc-500">
              {filaConcluido.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {filaConcluido.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa concluída.</div>
            ) : (
              filaConcluido.map((item) => (
                <ItemConcluido key={item.id} item={item} toggleConcluir={toggleConcluir} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
