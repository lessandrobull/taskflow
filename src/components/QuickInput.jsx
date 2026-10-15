import React, { useState, useRef, useEffect } from 'react';
import { Plus } from '@phosphor-icons/react';
import { processarInputRapido } from '../utils/parser';
import { TIPOS_TAREFA } from '../types';
import { THEME } from '../colors';

export default function QuickInput({ onAdicionar }) {
  const [texto, setTexto] = useState('');
  const [erroAgenda, setErroAgenda] = useState('');
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
    if (!parsed || !parsed.titulo) return;

    // Regra: Bloqueia se for agenda e não tiver horário
    if (parsed.tipo === TIPOS_TAREFA.AGENDADO && !parsed.horario) {
      setErroAgenda('Informe o horário (ex: às 14h ou @14:30)');
      setTimeout(() => setErroAgenda(''), 3500);
      return;
    }

    onAdicionar(parsed);
    setTexto('');
    setErroAgenda('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 relative">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            if (erroAgenda) setErroAgenda('');
          }}
          className={`w-full rounded-xl px-3 py-1.5 text-xs transition-colors focus:outline-none border ${THEME.quickInput.bg} ${THEME.quickInput.border} ${THEME.quickInput.text} ${THEME.quickInput.borderFocus}`}
        />

        {/* Placeholder Composto com Cores (visível apenas quando vazio) */}
        {!texto && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-xs gap-1 select-none">
            {erroAgenda ? (
              <span className="text-rose-500 font-semibold">{erroAgenda}</span>
            ) : (
              <>
                <span className="text-emerald-700/80 font-semibold">Tarefa</span>
                <span className="text-purple-700/80 font-semibold">frequencia</span>
                <span className="text-zinc-400 font-medium">#contexto/sub-contexto</span>
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!texto.trim()}
          className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1 disabled:opacity-30 transition-opacity ${THEME.quickInput.btn}`}
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>
    </form>
  );
}
