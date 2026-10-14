import React, { useState, useRef, useEffect } from 'react';
import { Plus } from '@phosphor-icons/react';
import { processarInputRapido } from '../utils/parser';
import { THEME } from '../colors';

export default function QuickInput({ onAdicionar }) {
  const [texto, setTexto] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/') {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    const parsed = processarInputRapido(texto);
    if (parsed && parsed.titulo) {
      onAdicionar(parsed);
      setTexto('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 relative">
      <input
        ref={inputRef}
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Adicionar tarefa rápida... (/)"
        className={`w-full rounded-lg px-3 py-1.5 text-xs transition-colors focus:outline-none border ${THEME.quickInput.bg} ${THEME.quickInput.border} ${THEME.quickInput.text} ${THEME.quickInput.placeholder} ${THEME.quickInput.borderFocus}`}
      />
      <button
        type="submit"
        disabled={!texto.trim()}
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1 disabled:opacity-30 transition-opacity ${THEME.quickInput.btn}`}
      >
        <Plus size={14} weight="bold" />
      </button>
    </form>
  );
}