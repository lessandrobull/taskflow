import React from 'react';
import { CalendarBlank, ListNumbers, TreeStructure, NotePencil } from '@phosphor-icons/react';
import { THEME } from '../colors';

export default function BottomNav({ abaAtiva, setAbaAtiva }) {
  const abas = [
    { id: 'hoje', label: 'Hoje', Icone: CalendarBlank },
    { id: 'fila', label: 'Filas', Icone: ListNumbers },
    { id: 'contextos', label: 'Contextos', Icone: TreeStructure },
    { id: 'notas', label: 'Notas', Icone: NotePencil },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-20 border-t ${THEME.nav.bg} ${THEME.nav.border}`}>
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-3">
        {abas.map(({ id, label, Icone }) => {
          const ativo = abaAtiva === id;
          return (
            <button
              key={id}
              onClick={() => setAbaAtiva(id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                ativo ? THEME.nav.itemAtivo : THEME.nav.itemInativo
              }`}
            >
              <Icone size={20} weight={ativo ? 'bold' : 'regular'} />
              <span className="text-[10px] tracking-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
