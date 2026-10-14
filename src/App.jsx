import React, { useState } from 'react';
import { useTasks } from './useTasks';
import { useNotes } from './useNotes';
import TodayView from './views/TodayView';
import GlobalQueueView from './views/GlobalQueueView';
import ContextsView from './views/ContextsView';
import NotesView from './views/NotesView';
import BottomNav from './components/BottomNav';
import QuickInput from './components/QuickInput';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('hoje');
  const {
    tarefas,
    toggleConcluir,
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Topo Fixo com Título e Input Inteligente */}
      <header className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <span className="font-semibold text-sm tracking-tight text-zinc-100">
            {abaAtiva === 'hoje' && 'Hoje'}
            {abaAtiva === 'fila' && 'Fila Global'}
            {abaAtiva === 'contextos' && 'Contextos'}
            {abaAtiva === 'notas' && 'Notas'}
          </span>
          <QuickInput onAdicionar={adicionarTarefa} />
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="flex-1 max-w-md w-full mx-auto p-4">
        {abaAtiva === 'hoje' && (
          <TodayView tarefas={tarefas} toggleConcluir={toggleConcluir} />
        )}
        {abaAtiva === 'fila' && (
          <GlobalQueueView
            tarefas={tarefas}
            toggleConcluir={toggleConcluir}
            moverParaCima={moverParaCima}
            moverParaBaixo={moverParaBaixo}
            alternarPrioridade={alternarPrioridade}
          />
        )}
        {abaAtiva === 'contextos' && (
          <ContextsView
            tarefas={tarefas}
            toggleConcluir={toggleConcluir}
            adicionarTarefa={adicionarTarefa}
            alternarPrioridade={alternarPrioridade}
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
          />
        )}
      </main>

      {/* Rodapé Fixo */}
      <BottomNav abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
    </div>
  );
}