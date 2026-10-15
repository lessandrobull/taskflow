import React, { useState, useEffect } from 'react';
import { Circle, CheckCircle, ArrowCounterClockwise } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA } from '../types';
import { THEME } from '../colors';

export default function TodayView({ tarefas, toggleConcluir, pularParaDepois }) {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const formatarDataISO = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const hojeISO = formatarDataISO(agora);

  const converterParaMinutos = (horarioStr) => {
    if (!horarioStr) return null;
    const [horas, minutos] = horarioStr.split(':').map(Number);
    return horas * 60 + minutos;
  };

  const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();

  const calcularTempoRestante = (horarioStr) => {
    const minutosAlvo = converterParaMinutos(horarioStr);
    if (minutosAlvo === null) return '';

    const diffMin = minutosAlvo - minutosAtuais;
    if (diffMin <= 0) return 'Agora';

    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;

    if (h === 0) return `em ${m}m`;
    return `em ${h}h ${m > 0 ? `${m}m` : ''}`;
  };

  const rotinaAtrasada = (item) => {
    if (item.proximaData && item.proximaData < hojeISO) return true;
    if (item.horario) {
      const minAlvo = converterParaMinutos(item.horario);
      return minAlvo !== null && minutosAtuais > minAlvo;
    }
    return false;
  };

  // 1. Agenda: compromissos do dia com horário
  const agendadosTarefas = tarefas
    .filter((t) => {
      if (t.tipo !== TIPOS_TAREFA.AGENDADO) return false;
      const minAlvo = converterParaMinutos(t.horario);
      return minAlvo !== null && minAlvo >= minutosAtuais;
    })
    .sort((a, b) => (a.horario || '').localeCompare(b.horario || ''));

  // 2. Rotina: ativadas hoje e ordenadas estritamente pela Fila de Rotina
  const rotinaTarefas = tarefas
    .filter((t) => {
      if (t.tipo !== TIPOS_TAREFA.CADENCIA || t.concluido) return false;
      if (!t.proximaData) return true;
      return t.proximaData <= hojeISO;
    })
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  // 3. Foco: fila ordenada de execução
  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const cardPrincipal = filaFoco[0] || null;
  const cardsRadar = filaFoco.slice(1);

  return (
    <div className="h-full flex flex-col justify-between gap-2.5 overflow-hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
      {/* 1. BLOCO AGENDA */}
      <section className="flex flex-col shrink-0 lg:h-full lg:min-h-0 lg:flex-1">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.agendados.titulo}`}>
            Agenda
          </h2>
          <span className="text-[11px] font-mono text-zinc-400 lg:inline hidden">
            {agendadosTarefas.length} {agendadosTarefas.length === 1 ? 'compromisso' : 'compromissos'}
          </span>
        </div>

        {agendadosTarefas.length > 0 ? (
          <div className="h-[158px] lg:h-full lg:flex-1 overflow-y-auto space-y-2 no-scrollbar pr-0.5">
            {agendadosTarefas.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-xl border shadow-sm shrink-0 ${THEME.agendados.cardBg} ${THEME.agendados.cardBorder}`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <DynamicIcon name={item.icone || 'Clock'} size={18} className={`shrink-0 ${THEME.agendados.icone}`} />
                  <span className={`text-sm font-semibold truncate ${THEME.agendados.texto}`}>{item.titulo}</span>
                </div>
                <div className="flex items-center gap-2 text-xs shrink-0">
                  <span className={`font-mono font-bold ${THEME.agendados.horario}`}>{item.horario}</span>
                  <span className={THEME.agendados.tempoRestante}>({calcularTempoRestante(item.horario)})</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`h-[158px] lg:h-full lg:flex-1 flex items-center justify-center rounded-xl border border-dashed text-xs text-center shrink-0 ${THEME.agendados.cardBg} ${THEME.agendados.cardBorder} ${THEME.agendados.tempoRestante}`}>
            Nenhum compromisso agendado
          </div>
        )}
      </section>

      {/* 2. BLOCO ROTINA */}
      <section className="flex flex-col shrink-0 lg:h-full lg:min-h-0 lg:flex-1">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.rotina.titulo}`}>
            Rotina
          </h2>
          <span className="text-[11px] font-mono text-zinc-400 lg:inline hidden">
            {rotinaTarefas.length} {rotinaTarefas.length === 1 ? 'ritual' : 'rituais'}
          </span>
        </div>

        {rotinaTarefas.length > 0 ? (
          <div className="h-[158px] lg:h-full lg:flex-1 overflow-y-auto space-y-2 no-scrollbar pr-0.5">
            {rotinaTarefas.map((item) => {
              const atrasado = rotinaAtrasada(item);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleConcluir(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors shadow-sm shrink-0 ${THEME.rotina.cardBg} ${THEME.rotina.cardBorder}`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <button className={`transition-colors shrink-0 ${THEME.rotina.checkBtn}`}>
                      <Circle size={18} />
                    </button>
                    <DynamicIcon name={item.icone} size={18} className={`shrink-0 ${THEME.rotina.icone}`} />
                    <span className={`text-sm font-medium truncate ${THEME.rotina.texto}`}>{item.titulo}</span>
                  </div>
                  {atrasado && (
                    <span className={`text-[11px] px-2 py-0.5 rounded border font-medium shrink-0 ${THEME.rotina.alertaAtrasado}`}>
                      Pendente {item.horario ? `• ${item.horario}` : ''}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`h-[158px] lg:h-full lg:flex-1 flex items-center justify-center rounded-xl border border-dashed text-xs text-center shrink-0 ${THEME.rotina.cardBg} ${THEME.rotina.cardBorder} text-purple-400`}>
            Nenhuma rotina pendente
          </div>
        )}
      </section>

      {/* 3. BLOCO FOCO */}
      <section className="flex-1 min-h-0 flex flex-col justify-between lg:h-full lg:flex-1 lg:justify-start lg:gap-3">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.foco.titulo}`}>
            Foco
          </h2>
          <span className="text-[11px] font-mono text-zinc-400 lg:inline hidden">
            {filaFoco.length} {filaFoco.length === 1 ? 'tarefa' : 'tarefas'}
          </span>
        </div>

        {/* Card Principal de Foco */}
        {cardPrincipal ? (
          <div className={`p-4 rounded-xl border shadow-sm flex flex-col justify-between ${THEME.foco.principalBg} ${THEME.foco.principalBorder}`}>
            {/* Topo do Card: Número 1, Ícone e Título com alinhamento vertical */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-sm text-emerald-800 shrink-0">
                1.
              </span>
              <DynamicIcon
                name={cardPrincipal.icone}
                size={19}
                weight="bold"
                className={`shrink-0 ${THEME.foco.principalIcone}`}
              />
              <h3 className={`text-sm font-bold leading-normal truncate flex-1 min-w-0 ${THEME.foco.principalTexto}`}>
                {cardPrincipal.titulo}
              </h3>
            </div>

            {/* Rodapé do Card: Divisória centralizada e Botões com espaçamento */}
            <div className={`flex items-center justify-between pt-3 pb-0.5 mt-3.5 border-t ${THEME.foco.principalDivisor}`}>
              <button
                onClick={() => pularParaDepois(cardPrincipal.id)}
                className={`flex items-center gap-1.5 text-xs transition-colors font-medium ${THEME.foco.pularBtn}`}
                title="Mover para o fim da fila de foco"
              >
                <ArrowCounterClockwise size={14} />
                Pular para depois
              </button>

              <button
                onClick={() => toggleConcluir(cardPrincipal.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${THEME.foco.concluirBtn}`}
              >
                <CheckCircle size={15} weight="bold" />
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-4 rounded-xl border border-dashed flex items-center justify-center text-center text-xs ${THEME.foco.vazioBg}`}>
            Nenhuma tarefa na fila de foco para hoje.
          </div>
        )}

        {/* Cards no Radar */}
        {cardsRadar.length > 0 && (
          <div className="shrink-0 lg:flex-1 lg:min-h-0 flex flex-col mt-2 lg:mt-0">
            <span className={`text-[11px] font-semibold uppercase tracking-wide mb-1 shrink-0 ${THEME.foco.radarTitulo}`}>
              A seguir no radar ({cardsRadar.length})
            </span>
            <div className="h-[104px] lg:h-full lg:flex-1 overflow-y-auto space-y-2 no-scrollbar pr-0.5">
              {cardsRadar.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border shadow-sm shrink-0 ${THEME.foco.radarBg} ${THEME.foco.radarBorder}`}
                >
                  <span className={`font-mono font-bold text-xs shrink-0 ${THEME.foco.radarNumero}`}>
                    {index + 2}.
                  </span>
                  {item.icone && item.icone !== 'Circle' && (
                    <DynamicIcon name={item.icone} size={18} className={`shrink-0 ${THEME.foco.radarIcone}`} />
                  )}
                  <span className={`truncate text-sm font-medium ${THEME.foco.radarTexto}`}>
                    {item.titulo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
