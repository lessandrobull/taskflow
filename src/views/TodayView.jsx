import React, { useState, useEffect } from 'react';
import { Circle } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA } from '../types';
import { THEME } from '../colors';

const PESO_PRIORIDADE = {
  p1: 1,
  p2: 2,
  p3: 3,
};

export default function TodayView({ tarefas, toggleConcluir }) {
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

  // Regra Estrita: apenas ganha 'Pendente' quando o período JÁ TERMINOU (estritamente posterior)
  const rotinaPendenteOuAtrasada = (item) => {
    if (item.cadencia?.dataLimite) {
      return hojeISO > item.cadencia.dataLimite;
    }
    if (item.proximaData) {
      return hojeISO > item.proximaData;
    }
    return false;
  };

  // 1. Agenda: compromissos do dia
  const agendadosTarefas = tarefas
    .filter((t) => {
      if (t.tipo !== TIPOS_TAREFA.AGENDADO || t.concluido) return false;
      if (t.proximaData && t.proximaData > hojeISO) return false;

      if (t.horario) {
        const minAlvo = converterParaMinutos(t.horario);
        return minAlvo !== null && minAlvo >= minutosAtuais;
      }
      return true;
    })
    .sort((a, b) => {
      if (!a.horario && b.horario) return -1;
      if (a.horario && !b.horario) return 1;
      return (a.horario || '').localeCompare(b.horario || '');
    });

  // 2. Rotina: ativadas a partir de dataInicio
  const rotinaTarefas = tarefas
    .filter((t) => {
      if (t.tipo !== TIPOS_TAREFA.CADENCIA || t.concluido) return false;
      const inicio = t.cadencia?.dataInicio || t.proximaData;
      if (!inicio) return true;
      return inicio <= hojeISO;
    })
    .sort((a, b) => {
      const pendenteA = rotinaPendenteOuAtrasada(a);
      const pendenteB = rotinaPendenteOuAtrasada(b);

      if (pendenteA && !pendenteB) return -1;
      if (!pendenteA && pendenteB) return 1;

      if (pendenteA && pendenteB) {
        const pesoA = PESO_PRIORIDADE[a.prioridade?.toLowerCase()] || 2;
        const pesoB = PESO_PRIORIDADE[b.prioridade?.toLowerCase()] || 2;
        if (pesoA !== pesoB) return pesoA - pesoB;
        return (a.ordemFila || 0) - (b.ordemFila || 0);
      }

      return (a.ordemFila || 0) - (b.ordemFila || 0);
    });

  // 3. Foco: lista sequencial de pendências ativas
  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  return (
    <div className="h-full flex flex-col justify-between gap-3 overflow-hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
      {/* 1. BLOCO AGENDA */}
      <section className="flex-1 min-h-0 flex flex-col lg:h-full">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.agendados.titulo}`}>
            Agenda
          </h2>
          <span className="text-[11px] font-mono text-zinc-400">
            {agendadosTarefas.length} {agendadosTarefas.length === 1 ? 'compromisso' : 'compromissos'}
          </span>
        </div>

        {agendadosTarefas.length > 0 ? (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 no-scrollbar pr-0.5">
            {agendadosTarefas.map((item, index) => {
              const ehPrimeiro = index === 0;
              const estiloCard = ehPrimeiro
                ? 'bg-sky-100/90 border-sky-300/90 shadow-xs'
                : 'bg-sky-50/70 border-sky-200/80 shadow-xs';

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-colors shrink-0 ${estiloCard}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <DynamicIcon
                      name={item.icone || 'Clock'}
                      size={16}
                      className={`shrink-0 ${ehPrimeiro ? 'text-sky-700' : THEME.agendados.icone}`}
                    />
                    <span className={`text-xs font-semibold truncate ${THEME.agendados.texto}`}>
                      {item.titulo}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs shrink-0">
                    {item.horario ? (
                      <>
                        <span className={`font-mono font-bold text-xs ${THEME.agendados.horario}`}>
                          {item.horario}
                        </span>
                        <span className={`text-[11px] ${THEME.agendados.tempoRestante}`}>
                          ({calcularTempoRestante(item.horario)})
                        </span>
                      </>
                    ) : (
                      <span className="font-mono font-semibold px-1.5 py-0.5 rounded text-[10px] bg-sky-200/60 text-sky-900">
                        Dia todo
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border border-dashed border-sky-200 bg-sky-50/40 text-xs text-center text-sky-600/70">
            Nenhum compromisso agendado
          </div>
        )}
      </section>

      {/* 2. BLOCO ROTINA */}
      <section className="flex-1 min-h-0 flex flex-col lg:h-full">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.rotina.titulo}`}>
            Rotina
          </h2>
          <span className="text-[11px] font-mono text-zinc-400">
            {rotinaTarefas.length} {rotinaTarefas.length === 1 ? 'ritual' : 'rituais'}
          </span>
        </div>

        {rotinaTarefas.length > 0 ? (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 no-scrollbar pr-0.5">
            {rotinaTarefas.map((item, index) => {
              const pendente = rotinaPendenteOuAtrasada(item);
              const ehPrimeiro = index === 0;
              const estiloCard = ehPrimeiro
                ? 'bg-purple-100/90 border-purple-300/90 shadow-xs'
                : 'bg-purple-50/70 border-purple-200/80 shadow-xs';

              return (
                <div
                  key={item.id}
                  onClick={() => toggleConcluir(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border cursor-pointer transition-colors shrink-0 ${estiloCard}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <button className={`transition-colors shrink-0 ${THEME.rotina.checkBtn}`}>
                      <Circle size={16} />
                    </button>
                    <DynamicIcon
                      name={item.icone}
                      size={16}
                      className={`shrink-0 ${ehPrimeiro ? 'text-purple-700' : THEME.rotina.icone}`}
                    />
                    <span className={`text-xs font-medium truncate ${THEME.rotina.texto}`}>
                      {item.titulo}
                    </span>
                  </div>
                  {pendente && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium shrink-0 ${THEME.rotina.alertaAtrasado}`}>
                      Pendente
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border border-dashed border-purple-200 bg-purple-50/40 text-xs text-center text-purple-600/70">
            Nenhuma rotina pendente
          </div>
        )}
      </section>

      {/* 3. BLOCO FOCO */}
      <section className="flex-1 min-h-0 flex flex-col lg:h-full">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.foco.titulo}`}>
            Foco
          </h2>
          <span className="text-[11px] font-mono text-zinc-400">
            {filaFoco.length} {filaFoco.length === 1 ? 'tarefa' : 'tarefas'}
          </span>
        </div>

        {filaFoco.length > 0 ? (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 no-scrollbar pr-0.5">
            {filaFoco.map((item, index) => {
              const ehPrimeiro = index === 0;
              const estiloCard = ehPrimeiro
                ? 'bg-emerald-100/90 border-emerald-300/90 shadow-xs'
                : 'bg-emerald-50/70 border-emerald-200/80 shadow-xs';

              return (
                <div
                  key={item.id}
                  onClick={() => toggleConcluir(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border cursor-pointer transition-colors shrink-0 ${estiloCard}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <button className="text-emerald-500 hover:text-emerald-700 transition-colors shrink-0">
                      <Circle size={16} />
                    </button>
                    <DynamicIcon
                      name={item.icone}
                      size={16}
                      className={`shrink-0 ${ehPrimeiro ? 'text-emerald-800' : 'text-emerald-700'}`}
                    />
                    <span className="text-xs font-medium text-zinc-900 truncate">
                      {item.titulo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 text-xs text-center text-emerald-700/70">
            Nenhuma tarefa na fila de foco
          </div>
        )}
      </section>
    </div>
  );
}