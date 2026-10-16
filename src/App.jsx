import React, { useState, useEffect } from 'react';
import { useTasks } from './useTasks';
import { useNotes } from './useNotes';
import TodayView from './views/TodayView';
import GlobalQueueView from './views/GlobalQueueView';
import ContextsView from './views/ContextsView';
import NotesView from './views/NotesView';
import BottomNav from './components/BottomNav';
import QuickInput from './components/QuickInput';
import { THEME } from './colors';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState(() => {
    return sessionStorage.getItem('taskflow_aba_ativa') || 'hoje';
  });

  useEffect(() => {
    sessionStorage.setItem('taskflow_aba_ativa', abaAtiva);
  }, [abaAtiva]);
  const {
    tarefas,
    toggleConcluir,
    pularParaDepois,
    removerTarefa,
    limparConcluidos,
    editarTarefa,
    moverParaCima,
    moverParaBaixo,
    alternarPrioridade,
    adicionarTarefa,
  } = useTasks();

  const {
    notas,
    notaAtiva,
    notaAtivaId,
    setNotaAtivaId,
    criarNota,
    atualizarNota,
    removerNota,
  } = useNotes();

  return (
    <div className={`h-dvh flex flex-col font-sans overflow-hidden ${THEME.app.bg} ${THEME.app.text}`}>
      <header className={`sticky top-0 z-10 border-b px-4 py-2.5 shrink-0 ${THEME.app.headerBg} ${THEME.app.headerBorder}`}>
        <div className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center gap-3">
          <span className={`font-bold text-sm tracking-tight ${THEME.app.headerTitle}`}>
            {abaAtiva === 'hoje' && 'Hoje'}
            {abaAtiva === 'fila' && 'Filas'}
            {abaAtiva === 'contextos' && 'Contextos'}
            {abaAtiva === 'notas' && 'Notas'}
          </span>
          <QuickInput onAdicionar={adicionarTarefa} />
        </div>
      </header>

      <main
        className={`flex-1 max-w-md lg:max-w-6xl xl:max-w-7xl w-full mx-auto px-4 pt-3 pb-16 flex flex-col min-h-0 ${
          abaAtiva === 'hoje' || abaAtiva === 'notas' ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        {abaAtiva === 'hoje' && (
          <TodayView
            tarefas={tarefas}
            toggleConcluir={toggleConcluir}
            pularParaDepois={pularParaDepois}
          />
        )}
        {abaAtiva === 'fila' && (
          <GlobalQueueView
            tarefas={tarefas}
            toggleConcluir={toggleConcluir}
            moverParaCima={moverParaCima}
            moverParaBaixo={moverParaBaixo}
            alternarPrioridade={alternarPrioridade}
            removerTarefa={removerTarefa}
            limparConcluidos={limparConcluidos}
          />
        )}
        {abaAtiva === 'contextos' && (
          <ContextsView
            tarefas={tarefas}
            adicionarTarefa={adicionarTarefa}
            alternarPrioridade={alternarPrioridade}
            editarTarefa={editarTarefa}
            removerTarefa={removerTarefa}
          />
        )}
        {abaAtiva === 'notas' && (
          <NotesView
            notas={notas}
            notaAtiva={notaAtiva}
            notaAtivaId={notaAtivaId}
            setNotaAtivaId={setNotaAtivaId}
            criarNota={criarNota}
            atualizarNota={atualizarNota}
            removerNota={removerNota}
            onAdicionarTarefa={adicionarTarefa}
            tarefas={tarefas}
          />
        )}
      </main>

      <BottomNav abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
    </div>
  );
}
