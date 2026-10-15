import React, { useState } from 'react';
import { Plus, Trash, ArrowElbowDownRight, FileText, CheckCircle } from '@phosphor-icons/react';
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
  const [linhaConvertida, setLinhaConvertida] = useState(null);

  const handleConverterLinha = (linha, idx) => {
    const limpa = linha.replace(/^[-*•\d.]\s*/, '').trim();
    if (!limpa) return;

    const parsed = processarInputRapido(limpa);
    if (!parsed || !parsed.titulo) return;

    onAdicionarTarefa(parsed);
    setLinhaConvertida(idx);
    setMensagemConversao(`Tarefa "${parsed.titulo}" criada na fila.`);

    setTimeout(() => {
      setMensagemConversao('');
      setLinhaConvertida(null);
    }, 2500);
  };

  if (!notaAtiva) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20 text-zinc-400 text-xs">
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
    <div className="h-full flex flex-col overflow-hidden">
      {/* ======================================================== */}
      {/* 1. VISUALIZAÇÃO MOBILE (< lg)                            */}
      {/* ======================================================== */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden lg:hidden">
        {/* Barra Superior: Abas com rolagem horizontal + Botão '+' FIXO */}
        <div className={`flex items-center justify-between gap-2 pb-1.5 border-b ${THEME.notas.divisor} shrink-0`}>
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

          <button
            onClick={criarNota}
            className={`p-1.5 rounded-lg border transition-colors shrink-0 shadow-sm ${THEME.notas.addBtn}`}
            title="Nova nota"
          >
            <Plus size={14} weight="bold" />
          </button>
        </div>

        {/* Editor da Nota Ativa */}
        <div className="shrink-0 mt-2 space-y-1.5">
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
                className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors shrink-0"
                title="Excluir nota"
              >
                <Trash size={15} />
              </button>
            )}
          </div>

          <textarea
            rows={linhasUteis.length > 0 ? 5 : 9}
            value={notaAtiva.conteudo}
            onChange={(e) => atualizarNota(notaAtiva.id, { conteudo: e.target.value })}
            placeholder="Escreva livremente... Use #contexto ou @horario para converter linhas em tarefas abaixo."
            className={`w-full border rounded-xl p-2.5 text-xs leading-relaxed font-sans focus:outline-none resize-none transition-colors shadow-sm ${THEME.notas.editorBg} ${THEME.notas.editorBorder} ${THEME.notas.editorTexto} ${THEME.notas.editorPlaceholder}`}
          />
        </div>

        {/* Transformar Linha em Tarefa (Mobile) */}
        {linhasUteis.length > 0 && (
          <div className={`mt-2 pt-1.5 border-t ${THEME.notas.divisor} flex-1 min-h-0 flex flex-col overflow-hidden`}>
            <div className="flex items-center justify-between mb-1.5 shrink-0">
              <span className={`text-[11px] uppercase tracking-wider font-bold ${THEME.notas.cabecalhoTitulo}`}>
                Transformar linha em tarefa
              </span>
              {mensagemConversao && (
                <span className={`text-[11px] transition-opacity ${THEME.notas.msgSucesso}`}>
                  {mensagemConversao}
                </span>
              )}
            </div>

            {/* Apenas esta lista rola, ocupando todo o espaço até a barra inferior sem barra visível */}
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-1.5 pr-0.5 pb-1">
              {linhasUteis.map((linha, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-colors group shrink-0 ${THEME.notas.cardLinhaBg} ${THEME.notas.cardLinhaBorder}`}
                >
                  <span className={`truncate flex-1 mr-2 text-xs font-medium ${THEME.notas.cardLinhaTexto}`}>
                    {linha}
                  </span>
                  <button
                    onClick={() => handleConverterLinha(linha, idx)}
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

      {/* ======================================================== */}
      {/* 2. VISUALIZAÇÃO DESKTOP (lg+) - Split Screen Tela Única   */}
      {/* ======================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:h-full lg:min-h-0">
        {/* Painel Esquerdo: Editor Amplo (7 colunas) */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-0 border-r border-zinc-200 pr-5">
          <div className={`flex items-center justify-between gap-2 pb-2 mb-3 border-b ${THEME.notas.divisor} shrink-0`}>
            <div className="flex-1 overflow-x-auto no-scrollbar py-0.5">
              <div className="flex items-center gap-1.5">
                {notas.map((n) => {
                  const ativa = n.id === notaAtivaId;
                  return (
                    <button
                      key={n.id}
                      onClick={() => setNotaAtivaId(n.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all border shrink-0 ${
                        ativa ? THEME.notas.abaAtiva : THEME.notas.abaInativa
                      }`}
                    >
                      <FileText
                        size={14}
                        weight={ativa ? 'fill' : 'regular'}
                        className={ativa ? 'text-amber-700' : 'text-zinc-400'}
                      />
                      <span className="max-w-[140px] truncate">
                        {n.titulo.trim() || 'Sem título'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={criarNota}
              className={`p-1.5 rounded-lg border transition-colors shrink-0 shadow-sm ${THEME.notas.addBtn}`}
              title="Nova nota"
            >
              <Plus size={15} weight="bold" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3 shrink-0">
            <input
              type="text"
              value={notaAtiva.titulo}
              onChange={(e) => atualizarNota(notaAtiva.id, { titulo: e.target.value })}
              placeholder="Título da anotação..."
              className="flex-1 bg-white border border-zinc-200 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm font-bold text-zinc-900 placeholder-zinc-400 focus:outline-none shadow-sm transition-colors"
            />

            {notas.length > 1 && (
              <button
                onClick={() => removerNota(notaAtiva.id)}
                className="text-zinc-400 hover:text-rose-600 p-2 rounded-xl hover:bg-zinc-100 transition-colors shrink-0"
                title="Excluir esta nota"
              >
                <Trash size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
            <textarea
              value={notaAtiva.conteudo}
              onChange={(e) => atualizarNota(notaAtiva.id, { conteudo: e.target.value })}
              placeholder="Escreva livremente... Use #contexto ou @horario para gerar botões de tarefa no painel lateral."
              className={`flex-1 w-full border rounded-xl p-4 text-xs leading-relaxed font-sans focus:outline-none resize-none transition-colors shadow-sm ${THEME.notas.editorBg} ${THEME.notas.editorBorder} ${THEME.notas.editorTexto} ${THEME.notas.editorPlaceholder}`}
            />
          </div>
        </div>

        {/* Painel Direito: Botões de Ação Direta (5 colunas) */}
        <div className="lg:col-span-5 flex flex-col h-full min-h-0 pl-1">
          <div className="pb-3 mb-3 border-b border-zinc-200 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.notas.cabecalhoTitulo}`}>
                Criar Tarefas da Nota
              </h2>
              {mensagemConversao && (
                <span className={`text-[11px] transition-opacity ${THEME.notas.msgSucesso}`}>
                  {mensagemConversao}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Clique em qualquer botão abaixo para enviá-lo como tarefa ativa
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {linhasUteis.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 text-xs py-16 border border-dashed border-zinc-200 rounded-xl">
                <p>Nenhuma linha de texto detectada.</p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Digite itens na anotação ao lado para transformá-los em botões diretos.
                </p>
              </div>
            ) : (
              linhasUteis.map((linha, idx) => {
                const limpa = linha.replace(/^[-*•\d.]\s*/, '').trim();
                const foiConvertida = linhaConvertida === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleConverterLinha(linha, idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all shadow-sm flex items-center justify-between group ${
                      foiConvertida
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-white border-zinc-200 hover:border-amber-300 hover:bg-amber-50/40 text-zinc-800'
                    }`}
                    title="Clique para adicionar à sua fila de tarefas"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-3">
                      {foiConvertida ? (
                        <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0" />
                      ) : (
                        <Plus size={15} weight="bold" className="text-amber-600 shrink-0 group-hover:scale-110 transition-transform" />
                      )}
                      <span className="text-xs font-semibold truncate">
                        {limpa}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 transition-colors ${
                        foiConvertida
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300 group-hover:bg-amber-200'
                      }`}
                    >
                      {foiConvertida ? 'Adicionada' : 'Criar Tarefa'}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
