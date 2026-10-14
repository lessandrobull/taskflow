import React, { useState } from 'react';
import { Plus, Trash, ArrowElbowDownRight, FileText } from '@phosphor-icons/react';
import { processarInputRapido } from '../utils/parser';

export default function NotesView({
  notas,
  notaAtiva,
  notaAtivaId,
  setNotaAtivaId,
  criarNota,
  atualizarNota,
  removerNota,
  onAdicionarTarefa,
}) {
  const [linhaSelecionada, setLinhaSelecionada] = useState('');
  const [mensagemConversao, setMensagemConversao] = useState('');

  const handleConverterLinha = (linha) => {
    const limpa = linha.replace(/^[-*•\d.]\s*/, '').trim();
    if (!limpa) return;

    const parsed = processarInputRapido(limpa);
    if (!parsed || !parsed.titulo) return;

    onAdicionarTarefa(parsed);
    setMensagemConversao(`Tarefa "${parsed.titulo}" criada na fila.`);
    setTimeout(() => setMensagemConversao(''), 3000);
  };

  if (!notaAtiva) {
    return (
      <div className="text-center py-20 text-zinc-500 text-xs">
        <p className="mb-3">Nenhuma nota selecionada.</p>
        <button
          onClick={criarNota}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700"
        >
          <Plus size={14} /> Criar nova nota
        </button>
      </div>
    );
  }

  // Linhas válidas com conteúdo para atalho de conversão
  const linhasUteis = notaAtiva.conteudo
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 2);

  return (
    <div className="space-y-4 pb-24">
      {/* Barra de Abas / Seleção de Notas */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-zinc-800 no-scrollbar">
        <div className="flex items-center gap-1.5">
          {notas.map((n) => {
            const ativa = n.id === notaAtivaId;
            return (
              <button
                key={n.id}
                onClick={() => setNotaAtivaId(n.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  ativa
                    ? 'bg-zinc-900 text-zinc-100 border border-zinc-700 font-medium'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <FileText size={13} weight={ativa ? 'fill' : 'regular'} />
                <span className="max-w-[100px] truncate">{n.titulo || 'Sem título'}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={criarNota}
          className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 bg-zinc-900/60 border border-zinc-800 shrink-0"
          title="Nova nota"
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>

      {/* Editor da Nota Ativa */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            value={notaAtiva.titulo}
            onChange={(e) => atualizarNota(notaAtiva.id, { titulo: e.target.value })}
            placeholder="Título da anotação..."
            className="w-full bg-transparent text-sm font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none"
          />

          {notas.length > 1 && (
            <button
              onClick={() => removerNota(notaAtiva.id)}
              className="text-zinc-600 hover:text-rose-400 p-1 transition-colors"
              title="Excluir nota"
            >
              <Trash size={14} />
            </button>
          )}
        </div>

        <textarea
          rows={12}
          value={notaAtiva.conteudo}
          onChange={(e) => atualizarNota(notaAtiva.id, { conteudo: e.target.value })}
          placeholder="Escreva livremente... Use #contexto ou @horario se desejar converter linhas depois."
          className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-600 leading-relaxed font-mono focus:outline-none focus:border-zinc-700 resize-none transition-colors"
        />
      </div>

      {/* Seção de Conversão Rápida: Linhas -> Tarefas */}
      {linhasUteis.length > 0 && (
        <div className="pt-2 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-zinc-500 font-semibold">
              Transformar linha em tarefa
            </span>
            {mensagemConversao && (
              <span className="text-[11px] text-emerald-400 transition-opacity">
                {mensagemConversao}
              </span>
            )}
          </div>

          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
            {linhasUteis.slice(0, 5).map((linha, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/30 border border-zinc-800/40 text-xs text-zinc-400 group hover:border-zinc-700"
              >
                <span className="truncate flex-1 mr-2 font-mono text-[11px]">
                  {linha}
                </span>
                <button
                  onClick={() => handleConverterLinha(linha)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-[10px] shrink-0 transition-colors"
                >
                  <ArrowElbowDownRight size={11} />
                  Criar Tarefa
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}