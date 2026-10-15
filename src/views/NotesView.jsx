import React, { useState } from 'react';
import { Plus, Trash, ArrowElbowDownRight, FileText } from '@phosphor-icons/react';
import { processarInputRapido } from '../utils/parser';
import { THEME } from '../colors';

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
      <div className="text-center py-20 text-zinc-400 text-xs">
        <p className="mb-3">Nenhuma nota selecionada.</p>
        <button
          onClick={criarNota}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold shadow-sm transition-colors ${THEME.notas.addBtn}`}
        >
          <Plus size={14} weight="bold" /> Criar nova nota
        </button>
      </div>
    );
  }

  const linhasUteis = notaAtiva.conteudo
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 2);

  return (
    <div className="space-y-4 pb-24">
      {/* Barra Superior: Abas com rolagem horizontal + Botão '+' FIXO à direita */}
      <div className={`flex items-center justify-between gap-2 pb-2 border-b ${THEME.notas.divisor}`}>
        {/* Área de abas com rolagem independente */}
        <div className="flex-1 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1.5">
            {notas.map((n) => {
              const ativa = n.id === notaAtivaId;
              return (
                <button
                  key={n.id}
                  onClick={() => setNotaAtivaId(n.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all border shrink-0 ${
                    ativa ? THEME.notas.abaAtiva : THEME.notas.abaInativa
                  }`}
                >
                  <FileText
                    size={13}
                    weight={ativa ? 'fill' : 'regular'}
                    className={ativa ? 'text-amber-700' : 'text-zinc-400'}
                  />
                  <span className="max-w-[120px] truncate">
                    {n.titulo.trim() || 'Sem título'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Botão '+' estático, fixado na lateral direita */}
        <button
          onClick={criarNota}
          className={`p-1.5 rounded-lg border transition-colors shrink-0 shadow-sm ${THEME.notas.addBtn}`}
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
            className="flex-1 bg-white border border-zinc-200 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm font-bold text-zinc-900 placeholder-zinc-400 focus:outline-none shadow-sm transition-colors"
          />

          {notas.length > 1 && (
            <button
              onClick={() => removerNota(notaAtiva.id)}
              className="text-zinc-400 hover:text-rose-600 p-2 rounded-lg hover:bg-zinc-100 transition-colors shrink-0"
              title="Excluir nota"
            >
              <Trash size={15} />
            </button>
          )}
        </div>

        <textarea
          rows={11}
          value={notaAtiva.conteudo}
          onChange={(e) => atualizarNota(notaAtiva.id, { conteudo: e.target.value })}
          placeholder="Escreva livremente... Use #contexto ou @horario para converter linhas em tarefas abaixo."
          className={`w-full border rounded-xl p-3 text-xs leading-relaxed font-sans focus:outline-none resize-none transition-colors shadow-sm ${THEME.notas.editorBg} ${THEME.notas.editorBorder} ${THEME.notas.editorTexto} ${THEME.notas.editorPlaceholder}`}
        />
      </div>

      {/* Transformar Linha em Tarefa */}
      {linhasUteis.length > 0 && (
        <div className={`pt-2 border-t ${THEME.notas.divisor} space-y-2`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] uppercase tracking-wider font-bold ${THEME.notas.cabecalhoTitulo}`}>
              Transformar linha em tarefa
            </span>
            {mensagemConversao && (
              <span className={`text-[11px] transition-opacity ${THEME.notas.msgSucesso}`}>
                {mensagemConversao}
              </span>
            )}
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {linhasUteis.slice(0, 5).map((linha, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 rounded-lg border transition-colors group ${THEME.notas.cardLinhaBg} ${THEME.notas.cardLinhaBorder}`}
              >
                <span className={`truncate flex-1 mr-2 text-xs font-medium ${THEME.notas.cardLinhaTexto}`}>
                  {linha}
                </span>
                <button
                  onClick={() => handleConverterLinha(linha)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border transition-colors shadow-sm shrink-0 ${THEME.notas.converterBtn}`}
                >
                  <ArrowElbowDownRight size={11} weight="bold" />
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
