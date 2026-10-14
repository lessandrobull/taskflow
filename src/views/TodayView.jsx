import React from 'react';
import { Circle, CheckCircle, ArrowCounterClockwise } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA } from '../types';

export default function TodayView({ tarefas, toggleConcluir }) {
  // Cálculo de tempo restante para compromissos agendados
  const calcularTempoRestante = (horarioStr) => {
    if (!horarioStr) return '';
    const [horas, minutos] = horarioStr.split(':').map(Number);
    const agora = new Date();
    const alvo = new Date();
    alvo.setHours(horas, minutos, 0, 0);

    const diffMs = alvo - agora;
    if (diffMs < 0) return 'Horário passou';

    const diffMin = Math.floor(diffMs / (1000 * 60));
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;

    if (h === 0) return `em ${m}m`;
    return `em ${h}h ${m > 0 ? `${m}m` : ''}`;
  };

  // Verifica se o ritual matinal/diário passou da hora sem check
  const ritualAtrasado = (horarioStr) => {
    if (!horarioStr) return false;
    const [horas, minutos] = horarioStr.split(':').map(Number);
    const agora = new Date();
    const limite = new Date();
    limite.setHours(horas, minutos, 0, 0);
    return agora > limite;
  };

  // Filtros dos blocos
  const agendados = tarefas.filter((t) => t.tipo === TIPOS_TAREFA.AGENDADO && !t.concluido);
  const rituais = tarefas.filter((t) => t.tipo === TIPOS_TAREFA.CADENCIA && !t.concluido);
  
  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => a.ordemFila - b.ordemFila);

  const cardPrincipal = filaFoco[0];
  const cardsRadar = filaFoco.slice(1, 3);

  return (
    <div className="space-y-6 pb-24">
      {/* 1. BLOCO AGENDADOS */}
      {agendados.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">
            Agendados
          </h2>
          <div className="space-y-2">
            {agendados.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3">
                  <DynamicIcon name={item.icone} size={18} className="text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-200">{item.titulo}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-300 font-mono">{item.horario}</span>
                  <span className="text-zinc-500">({calcularTempoRestante(item.horario)})</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. BLOCO RITUAIS & CADÊNCIA */}
      {rituais.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">
            Rituais de Hoje
          </h2>
          <div className="space-y-2">
            {rituais.map((item) => {
              const atrasado = ritualAtrasado(item.horario);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleConcluir(item.id)}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button className="text-zinc-500 hover:text-emerald-400 transition-colors">
                      <Circle size={18} />
                    </button>
                    <DynamicIcon name={item.icone} size={18} className="text-zinc-400" />
                    <span className="text-sm text-zinc-200">{item.titulo}</span>
                  </div>
                  {atrasado && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-900/40">
                      Pendente • {item.horario}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. BLOCO FILA DE FOCO (1 + 2) */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">
          Foco Atual
        </h2>

        {/* Card Principal (Nº 1) */}
        {cardPrincipal ? (
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 shadow-md space-y-4">
            <div className="flex items-start gap-3">
              <DynamicIcon name={cardPrincipal.icone} size={22} weight="bold" className="text-zinc-100 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-zinc-100 leading-snug">
                  {cardPrincipal.titulo}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <button
                onClick={() => toggleConcluir(cardPrincipal.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-colors"
              >
                <CheckCircle size={16} weight="bold" />
                Concluir
              </button>

              <button
                onClick={() => toggleConcluir(cardPrincipal.id)}
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <ArrowCounterClockwise size={14} />
                Pular para depois
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-dashed border-zinc-800 text-center text-xs text-zinc-500">
            Nenhuma tarefa na fila de foco para hoje.
          </div>
        )}

        {/* Cards Radar (Nº 2 e Nº 3) */}
        {cardsRadar.length > 0 && (
          <div className="mt-3 space-y-2">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wide">A seguir no radar</span>
            {cardsRadar.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/40 text-zinc-400 text-xs"
              >
                <span className="font-mono text-zinc-600">{index + 2}.</span>
                <DynamicIcon name={item.icone} size={16} className="text-zinc-500" />
                <span className="truncate">{item.titulo}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}