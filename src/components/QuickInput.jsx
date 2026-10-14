import React, { useState, useRef, useEffect } from 'react';
import { Plus, Tag, Clock } from '@phosphor-icons/react';
import { processarInputRapido } from '../utils/parser';

export default function QuickInput({ onAdicionar }) {
  const [texto, setTexto] = useState('');
  const inputRef = useRef(null);

  // Atalho global: premir "/" foca o input; "Esc" desmarca o campo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const preview = texto.includes('#') || texto.includes('@') ? processarInputRapido(texto) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = processarInputRapido(texto);
    if (!parsed || !parsed.titulo) return;

    onAdicionar(parsed);
    setTexto('');
  };

  return (
    <div className="flex-1 relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Adicionar tarefa... (pressione / para focar)"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-3 pr-8 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
        />
        <button
          type="submit"
          disabled={!texto.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100 disabled:opacity-30 p-1 transition-opacity"
        >
          <Plus size={14} weight="bold" />
        </button>
      </form>

      {/* Roteamento Oculto: pré-visualização em tempo real */}
      {preview && (preview.contexto !== 'geral' || preview.horario) && (
        <div className="absolute top-full left-0 right-0 mt-1.5 p-2 bg-zinc-900/95 backdrop-blur border border-zinc-800 rounded-lg shadow-xl flex items-center gap-3 text-[11px] text-zinc-400 z-20">
          {preview.contexto !== 'geral' && (
            <div className="flex items-center gap-1 text-zinc-300 truncate">
              <Tag size={12} className="text-zinc-500 shrink-0" />
              <span className="truncate">{preview.contexto.replace(/\//g, ' › ')}</span>
            </div>
          )}
          {preview.horario && (
            <div className="flex items-center gap-1 text-zinc-300 shrink-0">
              <Clock size={12} className="text-zinc-500" />
              <span className="font-mono">{preview.horario}</span>
            </div>
          )}
          <span className="ml-auto text-zinc-500 text-[10px] shrink-0">↵ salvar</span>
        </div>
      )}
    </div>
  );
}