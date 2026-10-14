import React from 'react';
import { Lightning, Queue, Folder, NoteBlank } from '@phosphor-icons/react';

export default function BottomNav({ abaAtiva, setAbaAtiva }) {
  const botoes = [
    { id: 'hoje', label: 'Hoje', icon: Lightning },
    { id: 'fila', label: 'Fila Global', icon: Queue },
    { id: 'contextos', label: 'Contextos', icon: Folder },
    { id: 'notas', label: 'Notas', icon: NoteBlank },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/80 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {botoes.map((btn) => {
          const Icon = btn.icon;
          const ativo = abaAtiva === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setAbaAtiva(btn.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
                ativo ? 'text-zinc-100 font-medium' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={20} weight={ativo ? 'fill' : 'regular'} />
              <span className="text-[11px] tracking-wide">{btn.label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}