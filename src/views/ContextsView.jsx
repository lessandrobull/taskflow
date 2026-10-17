import React, { useState, useEffect } from 'react';
import {
  Folder,
  FolderOpen,
  CaretRight,
  CaretDown,
  Plus,
  Check,
  PencilSimple,
  Trash,
  X,
  Tag,
} from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { processarInputRapido, resolverIconePorContexto } from '../utils/parser';
import { construirArvoreContextos } from '../utils/tree';
import { PRIORIDADES, TIPOS_TAREFA } from '../types';
import { THEME } from '../colors';

const PASTAS_STORAGE_KEY = 'taskflow_pastas_abertas_v1';

function CardTarefaContexto({
  tarefa,
  editandoId,
  textoEdicao,
  setTextoEdicao,
  setEditandoId,
  iniciarEdicao,
  salvarEdicao,
  alternarPrioridade,
  onRemoverTarefa,
}) {
  const ehRotina = tarefa.tipo === TIPOS_TAREFA.CADENCIA;
  const ehAgendado = tarefa.tipo === TIPOS_TAREFA.AGENDADO;

  const estiloCard = ehAgendado
    ? `${THEME.contextos.agendaBg} ${THEME.contextos.agendaBorder}`
    : ehRotina
      ? `${THEME.contextos.rotinaBg} ${THEME.contextos.rotinaBorder}`
      : `${THEME.contextos.tarefaBg} ${THEME.contextos.tarefaBorder}`;

  const estiloTexto = ehAgendado
    ? THEME.contextos.agendaTexto
    : ehRotina
      ? THEME.contextos.rotinaTexto
      : THEME.contextos.tarefaTexto;

  const estiloIcone = ehAgendado
    ? THEME.contextos.agendaIcone
    : ehRotina
      ? THEME.contextos.rotinaIcone
      : THEME.contextos.tarefaIcone;

  const getBadgePrioridade = (t) => {
    const p = t.prioridade;
    if (t.tipo === TIPOS_TAREFA.CADENCIA) {
      if (p === PRIORIDADES.P1) return THEME.rotina.p1;
      if (p === PRIORIDADES.P2) return THEME.rotina.p2;
      return THEME.rotina.p3;
    }
    if (p === PRIORIDADES.P1) return THEME.foco.p1;
    if (p === PRIORIDADES.P2) return THEME.foco.p2;
    return THEME.foco.p3;
  };

  return (
    <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all shadow-sm ${estiloCard}`}>
      <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
        {tarefa.icone && (
          <DynamicIcon
            name={ehAgendado ? (tarefa.icone || 'Clock') : tarefa.icone}
            size={16}
            className={`shrink-0 ${estiloIcone}`}
          />
        )}

        {editandoId === tarefa.id ? (
          <div className="flex items-center gap-1 flex-1">
            <input
              type="text"
              autoFocus
              value={textoEdicao}
              onChange={(e) => setTextoEdicao(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') salvarEdicao(tarefa.id);
                if (e.key === 'Escape') setEditandoId(null);
              }}
              className={`flex-1 rounded px-2 py-0.5 text-xs border focus:outline-none bg-white text-zinc-900 ${THEME.quickInput.border}`}
            />
            <button
              onClick={() => salvarEdicao(tarefa.id)}
              className="p-1 text-emerald-600 hover:text-emerald-700"
              title="Salvar edição"
            >
              <Check size={13} weight="bold" />
            </button>
            <button
              onClick={() => setEditandoId(null)}
              className="p-1 text-zinc-400 hover:text-zinc-700"
              title="Cancelar edição"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <span className={`text-xs truncate font-medium ${estiloTexto}`}>
            {tarefa.titulo}
          </span>
        )}

        {tarefa.horario && (
          <span className={`text-[10px] font-mono shrink-0 ${THEME.contextos.horarioTexto}`}>
            @{tarefa.horario}
          </span>
        )}
      </div>

      {editandoId !== tarefa.id && (
        <div className="flex items-center gap-1 shrink-0">
          {!ehAgendado && (
            <button
              onClick={() => alternarPrioridade(tarefa.id)}
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono border uppercase tracking-wider ${getBadgePrioridade(tarefa)}`}
              title="Alternar prioridade"
            >
              {tarefa.prioridade}
            </button>
          )}

          <button
            onClick={() => iniciarEdicao(tarefa)}
            className={`p-1 transition-colors ${THEME.contextos.editarBtn}`}
            title="Editar tarefa"
          >
            <PencilSimple size={13} />
          </button>

          <button
            onClick={() => onRemoverTarefa(tarefa.id)}
            className={`p-1 transition-colors ${THEME.contextos.excluirBtn}`}
            title="Excluir tarefa"
          >
            <Trash size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

function NoPastaMobile({
  no,
  pastasAbertas,
  togglePasta,
  onAdicionarNaPasta,
  alternarPrioridade,
  onEditarTarefa,
  onRemoverTarefa,
}) {
  const [novoTexto, setNovoTexto] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState('');
  const [erroHorario, setErroHorario] = useState('');

  const temFilhos = Object.keys(no.filhos).length > 0;
  const temTarefas = no.tarefas.length > 0;
  const aberta = pastasAbertas[no.caminhoCompleto] ?? true;

  const handleCriarItem = (e) => {
    e.preventDefault();
    if (!novoTexto.trim()) return;

    const parsed = processarInputRapido(novoTexto.trim());
    if (!parsed || !parsed.titulo) return;

    const contextoDestino = parsed.contexto !== 'geral' ? parsed.contexto : no.caminhoCompleto;
    const ehContextoAgenda = contextoDestino === 'agenda' || contextoDestino.startsWith('agenda/');

    if (ehContextoAgenda && !parsed.horario) {
      setErroHorario('Informe o horário (ex: às 14h ou @14:30)');
      setTimeout(() => setErroHorario(''), 3500);
      return;
    }

    onAdicionarNaPasta({
      ...parsed,
      tipo: ehContextoAgenda ? TIPOS_TAREFA.AGENDADO : parsed.tipo,
      icone: ehContextoAgenda ? 'Clock' : resolverIconePorContexto(contextoDestino, parsed.tipo),
      contexto: contextoDestino,
    });

    setNovoTexto('');
    setMostrarInput(false);
    setErroHorario('');
  };

  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa.id);
    setTextoEdicao(reconstruirTextoTarefa(tarefa));
  };

  const salvarEdicao = (id) => {
    if (textoEdicao.trim()) {
      const parsed = processarInputRapido(textoEdicao.trim());
      if (parsed && parsed.titulo) {
        onEditarTarefa(id, {
          titulo: parsed.titulo,
          icone: parsed.icone,
          tipo: parsed.tipo,
          horario: parsed.horario,
          cadencia: parsed.cadencia ? { ...parsed.cadencia, textoOriginal: textoEdicao.trim() } : null,
          proximaData: parsed.proximaData,
          contexto: parsed.contexto !== 'geral' ? parsed.contexto : undefined,
        });
      } else {
        onEditarTarefa(id, { titulo: textoEdicao.trim() });
      }
    }
    setEditandoId(null);
    setTextoEdicao('');
  };

  const subpastasOrdenadas = Object.values(no.filhos).sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  const tarefasOrdenadas = [...no.tarefas].sort((a, b) =>
    (a.titulo || '').localeCompare(b.titulo || '', 'pt-BR')
  );

  return (
    <div className="space-y-1">
      <div className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors group ${THEME.contextos.linhaHover}`}>
        <button
          onClick={() => togglePasta(no.caminhoCompleto)}
          className="flex items-center gap-2 flex-1 text-left min-w-0"
        >
          {temFilhos || temTarefas ? (
            aberta ? (
              <CaretDown size={12} weight="bold" className={THEME.contextos.setaIcone} />
            ) : (
              <CaretRight size={12} weight="bold" className={THEME.contextos.setaIcone} />
            )
          ) : (
            <span className="w-3" />
          )}

          {aberta ? (
            <FolderOpen size={16} weight="regular" className={THEME.contextos.pastaAbertaIcone} />
          ) : (
            <Folder size={16} weight="regular" className={THEME.contextos.pastaFechadaIcone} />
          )}

          <span className={`text-xs font-semibold capitalize truncate ${THEME.contextos.pastaNome}`}>
            {no.nome}
          </span>

          <span className={`text-[10px] font-mono font-medium ${THEME.contextos.contador}`}>
            ({no.totalTarefas})
          </span>
        </button>

        <button
          onClick={() => setMostrarInput(!mostrarInput)}
          className={`opacity-0 group-hover:opacity-100 p-1 transition-opacity ${THEME.contextos.addBtn}`}
          title="Nova tarefa nesta pasta"
        >
          <Plus size={13} weight="bold" />
        </button>
      </div>

      {aberta && (
        <div className={`pl-4 ml-2 border-l space-y-2 pt-1 ${THEME.contextos.bordaArvore}`}>
          {mostrarInput && (
            <form onSubmit={handleCriarItem} className="flex flex-col gap-1 pr-2 my-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  autoFocus
                  value={novoTexto}
                  onChange={(e) => {
                    setNovoTexto(e.target.value);
                    if (erroHorario) setErroHorario('');
                  }}
                  placeholder={`Ação em "${no.nome}"...`}
                  className={`flex-1 rounded-lg px-2.5 py-1 text-xs focus:outline-none ${THEME.quickInput.bg} ${THEME.quickInput.border} ${THEME.quickInput.text} ${THEME.quickInput.placeholder} ${THEME.quickInput.borderFocus}`}
                />
                <button
                  type="submit"
                  disabled={!novoTexto.trim()}
                  className="p-1 rounded bg-zinc-800 text-white hover:bg-zinc-900 disabled:opacity-30 transition-colors"
                >
                  <Plus size={12} weight="bold" />
                </button>
              </div>
              {erroHorario && (
                <span className="text-[10px] text-rose-500 font-semibold px-1">{erroHorario}</span>
              )}
            </form>
          )}

          {temTarefas && (
            <div className="space-y-1.5 pr-2">
              {tarefasOrdenadas.map((tarefa) => (
                <CardTarefaContexto
                  key={tarefa.id}
                  tarefa={tarefa}
                  editandoId={editandoId}
                  textoEdicao={textoEdicao}
                  setTextoEdicao={setTextoEdicao}
                  setEditandoId={setEditandoId}
                  iniciarEdicao={iniciarEdicao}
                  salvarEdicao={salvarEdicao}
                  alternarPrioridade={alternarPrioridade}
                  onRemoverTarefa={onRemoverTarefa}
                />
              ))}
            </div>
          )}

          {temFilhos && (
            <div className="space-y-1 pt-1">
              {subpastasOrdenadas.map((subNo) => (
                <NoPastaMobile
                  key={subNo.caminhoCompleto}
                  no={subNo}
                  pastasAbertas={pastasAbertas}
                  togglePasta={togglePasta}
                  onAdicionarNaPasta={onAdicionarNaPasta}
                  alternarPrioridade={alternarPrioridade}
                  onEditarTarefa={onEditarTarefa}
                  onRemoverTarefa={onRemoverTarefa}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NoPastaDesktopSidebar({
  no,
  caminhoSelecionado,
  setCaminhoSelecionado,
  pastasAbertas,
  togglePasta,
}) {
  const temFilhos = Object.keys(no.filhos).length > 0;
  const aberta = pastasAbertas[no.caminhoCompleto] ?? false;
  const selecionada = caminhoSelecionado === no.caminhoCompleto;

  const estaAberta = temFilhos ? aberta : selecionada;

  const subpastasOrdenadas = Object.values(no.filhos).sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  return (
    <div className="space-y-0.5">
      <div
        className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg cursor-pointer transition-colors ${selecionada
            ? 'bg-zinc-200/80 text-zinc-950 font-bold border border-zinc-300'
            : 'hover:bg-zinc-100 text-zinc-700'
          }`}
        onClick={() => setCaminhoSelecionado(no.caminhoCompleto)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (temFilhos) {
                togglePasta(no.caminhoCompleto);
              } else {
                setCaminhoSelecionado(no.caminhoCompleto);
              }
            }}
            className="p-0.5 text-zinc-400 hover:text-zinc-700"
            title={temFilhos ? (aberta ? 'Recolher subpastas' : 'Expandir subpastas') : 'Selecionar pasta'}
          >
            {temFilhos && aberta ? (
              <CaretDown size={11} weight="bold" />
            ) : (
              <CaretRight size={11} weight="bold" />
            )}
          </button>

          {estaAberta ? (
            <FolderOpen size={15} weight="regular" className={selecionada ? 'text-zinc-900' : 'text-zinc-400'} />
          ) : (
            <Folder size={15} weight="regular" className={selecionada ? 'text-zinc-900' : 'text-zinc-400'} />
          )}

          <span className="text-xs capitalize truncate">{no.nome}</span>
        </div>

        <span className="text-[10px] font-mono text-zinc-400 font-medium">
          {no.totalTarefas}
        </span>
      </div>

      {temFilhos && aberta && (
        <div className="pl-3 ml-2 border-l border-zinc-200 space-y-0.5">
          {subpastasOrdenadas.map((subNo) => (
            <NoPastaDesktopSidebar
              key={subNo.caminhoCompleto}
              no={subNo}
              caminhoSelecionado={caminhoSelecionado}
              setCaminhoSelecionado={setCaminhoSelecionado}
              pastasAbertas={pastasAbertas}
              togglePasta={togglePasta}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function reconstruirTextoTarefa(tarefa) {
  if (!tarefa) return '';
  if (tarefa.cadencia?.textoOriginal) return tarefa.cadencia.textoOriginal;
  if (tarefa.textoOriginal) return tarefa.textoOriginal;

  const partes = [tarefa.titulo?.trim() || ''];

  if (tarefa.horario) {
    partes.push(`às ${tarefa.horario}`);
  }

  const cad = tarefa.cadencia;
  if (cad && typeof cad === 'object') {
    const diasSemanaMap = {
      0: 'domingo', 1: 'segunda', 2: 'terça', 3: 'quarta',
      4: 'quinta', 5: 'sexta', 6: 'sábado'
    };
    if (cad.dataInicio && cad.dataLimite) {
      try {
        const [anoIni, mesIni, diaIni] = cad.dataInicio.split('-').map(Number);
        const [anoLim, mesLim, diaLim] = cad.dataLimite.split('-').map(Number);
        const dtIni = new Date(anoIni, mesIni - 1, diaIni);
        const dtLim = new Date(anoLim, mesLim - 1, diaLim);
        const diaIniNome = diasSemanaMap[dtIni.getDay()];
        const diaLimNome = diasSemanaMap[dtLim.getDay()];
        partes.push(`de ${diaIniNome} à ${diaLimNome}`);
      } catch (e) {
        // fallback
      }
    }

    if (cad.frequencia === 'diaria' || cad.intervaloDias === 1) {
      partes.push('diariamente');
    } else if (cad.intervaloDias === 7) {
      partes.push('1x por semana');
    } else if (cad.intervaloDias === 15) {
      partes.push('quinzenalmente');
    } else if (cad.intervaloDias === 30) {
      partes.push('mensalmente');
    } else if (cad.intervaloDias > 1) {
      partes.push(`a cada ${cad.intervaloDias} dias`);
    }
  }

  if (tarefa.contexto && tarefa.contexto !== 'geral') {
    partes.push(`#${tarefa.contexto}`);
  }

  return partes.join(' ');
}

export default function ContextsView({
  tarefas,
  adicionarTarefa,
  alternarPrioridade,
  editarTarefa,
  removerTarefa,
}) {
  const [pastasAbertas, setPastasAbertas] = useState(() => {
    try {
      const salvas = localStorage.getItem(PASTAS_STORAGE_KEY);
      return salvas ? JSON.parse(salvas) : {};
    } catch {
      return {};
    }
  });

  // REGRA: Filtra apenas tarefas ativas. Concluídas somem de Contextos.
  const tarefasAtivas = tarefas.filter((t) => !t.concluido);
  const arvore = construirArvoreContextos(tarefasAtivas);

  const pastasPrincipais = Object.values(arvore.filhos).sort((a, b) => {
    if (a.nome === 'agenda') return -1;
    if (b.nome === 'agenda') return 1;
    return a.nome.localeCompare(b.nome);
  });

  const [caminhoSelecionado, setCaminhoSelecionado] = useState(
    () => pastasPrincipais[0]?.caminhoCompleto || 'agenda'
  );

  const [novoTextoDesktop, setNovoTextoDesktop] = useState('');
  const [editandoIdDesktop, setEditandoIdDesktop] = useState(null);
  const [textoEdicaoDesktop, setTextoEdicaoDesktop] = useState('');
  const [erroHorarioDesktop, setErroHorarioDesktop] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(PASTAS_STORAGE_KEY, JSON.stringify(pastasAbertas));
    } catch (e) {
      console.error('Falha ao persistir pastas:', e);
    }
  }, [pastasAbertas]);

  useEffect(() => {
    if (pastasPrincipais.length > 0 && !caminhoSelecionado) {
      setCaminhoSelecionado(pastasPrincipais[0].caminhoCompleto);
    }
  }, [pastasPrincipais, caminhoSelecionado]);

  const togglePasta = (caminho) => {
    setPastasAbertas((prev) => {
      const estadoAtual = prev[caminho] ?? true;
      return {
        ...prev,
        [caminho]: !estadoAtual,
      };
    });
  };

  const tarefasDoContextoDesktop = tarefasAtivas
    .filter((t) => {
      const ctx = (t.contexto || 'geral').toLowerCase().trim();
      return ctx === caminhoSelecionado || ctx.startsWith(`${caminhoSelecionado}/`);
    })
    .sort((a, b) => (a.titulo || '').localeCompare(b.titulo || '', 'pt-BR'));

  const handleCriarItemDesktop = (e) => {
    e.preventDefault();
    if (!novoTextoDesktop.trim()) return;

    const parsed = processarInputRapido(novoTextoDesktop.trim());
    if (!parsed || !parsed.titulo) return;

    const contextoDestino = parsed.contexto !== 'geral' ? parsed.contexto : caminhoSelecionado;
    const ehContextoAgenda = contextoDestino === 'agenda' || contextoDestino.startsWith('agenda/');

    if (ehContextoAgenda && !parsed.horario) {
      setErroHorarioDesktop('Informe o horário (ex: às 14h ou @14:30)');
      setTimeout(() => setErroHorarioDesktop(''), 3500);
      return;
    }

    adicionarTarefa({
      ...parsed,
      tipo: ehContextoAgenda ? TIPOS_TAREFA.AGENDADO : parsed.tipo,
      icone: ehContextoAgenda ? 'Clock' : resolverIconePorContexto(contextoDestino, parsed.tipo),
      contexto: contextoDestino,
    });

    setNovoTextoDesktop('');
    setErroHorarioDesktop('');
  };

  const iniciarEdicaoDesktop = (tarefa) => {
    setEditandoIdDesktop(tarefa.id);
    setTextoEdicaoDesktop(reconstruirTextoTarefa(tarefa));
  };

  const salvarEdicaoDesktop = (id) => {
    if (textoEdicaoDesktop.trim()) {
      const parsed = processarInputRapido(textoEdicaoDesktop.trim());
      if (parsed && parsed.titulo) {
        editarTarefa(id, {
          titulo: parsed.titulo,
          icone: parsed.icone,
          tipo: parsed.tipo,
          horario: parsed.horario,
          cadencia: parsed.cadencia ? { ...parsed.cadencia, textoOriginal: textoEdicaoDesktop.trim() } : null,
          proximaData: parsed.proximaData,
          contexto: parsed.contexto !== 'geral' ? parsed.contexto : undefined,
        });
      } else {
        editarTarefa(id, { titulo: textoEdicaoDesktop.trim() });
      }
    }
    setEditandoIdDesktop(null);
    setTextoEdicaoDesktop('');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 1. MOBILE (< lg) */}
      <div className="space-y-4 pb-24 overflow-y-auto no-scrollbar lg:hidden">
        <div className={`flex items-center justify-between pb-2 border-b ${THEME.contextos.divisor}`}>
          <div>
            <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.contextos.cabecalhoTitulo}`}>
              Árvore de Contextos
            </h2>
            <p className={`text-[11px] font-medium ${THEME.contextos.cabecalhoSubtitulo}`}>
              Gerencie pastas, rotinas e tarefas ativas
            </p>
          </div>
        </div>

        {pastasPrincipais.length === 0 ? (
          <div className="text-center py-16 text-zinc-400 text-xs">
            Nenhum contexto ativo.
          </div>
        ) : (
          <div className="space-y-2">
            {pastasPrincipais.map((no) => (
              <NoPastaMobile
                key={no.caminhoCompleto}
                no={no}
                pastasAbertas={pastasAbertas}
                togglePasta={togglePasta}
                onAdicionarNaPasta={adicionarTarefa}
                alternarPrioridade={alternarPrioridade}
                onEditarTarefa={editarTarefa}
                onRemoverTarefa={removerTarefa}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. DESKTOP (lg+) - Painel Mestre-Detalhe em escala de cinzas */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:h-full lg:min-h-0">
        {/* Painel Esquerdo: Pastas (Cinza Neutro) */}
        <div className="lg:col-span-4 flex flex-col h-full min-h-0 border-r border-zinc-200 pr-5">
          <div className="pb-3 mb-2 border-b border-zinc-200 shrink-0">
            <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.contextos.cabecalhoTitulo}`}>
              Pastas & Contextos
            </h2>
            <p className="text-[11px] text-zinc-500">
              Categorias e diretórios ativos
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 no-scrollbar pr-1">
            {pastasPrincipais.length === 0 ? (
              <div className="text-zinc-400 text-xs py-8">Nenhuma pasta ativa.</div>
            ) : (
              pastasPrincipais.map((no) => (
                <NoPastaDesktopSidebar
                  key={no.caminhoCompleto}
                  no={no}
                  caminhoSelecionado={caminhoSelecionado}
                  setCaminhoSelecionado={setCaminhoSelecionado}
                  pastasAbertas={pastasAbertas}
                  togglePasta={togglePasta}
                />
              ))
            )}
          </div>
        </div>

        {/* Painel Direito: Detalhe com Botão Cinza */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-0 pl-1">
          <div className="pb-3 mb-3 border-b border-zinc-200 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Tag size={15} weight="bold" className="text-zinc-500" />
                <h3 className="text-sm font-bold capitalize text-zinc-900 tracking-tight">
                  {caminhoSelecionado || 'Geral'}
                </h3>
              </div>
              <span className="text-xs font-mono font-medium text-zinc-500">
                {tarefasDoContextoDesktop.length}{' '}
                {tarefasDoContextoDesktop.length === 1 ? 'tarefa' : 'tarefas'}
              </span>
            </div>

            <form onSubmit={handleCriarItemDesktop} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={novoTextoDesktop}
                  onChange={(e) => {
                    setNovoTextoDesktop(e.target.value);
                    if (erroHorarioDesktop) setErroHorarioDesktop('');
                  }}
                  placeholder={`Nova ação em "${caminhoSelecionado}"...`}
                  className={`flex-1 rounded-xl px-3 py-1.5 text-xs focus:outline-none bg-white border border-zinc-200 shadow-sm ${THEME.quickInput.borderFocus}`}
                />
                <button
                  type="submit"
                  disabled={!novoTextoDesktop.trim()}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm disabled:opacity-30 bg-zinc-800 text-white hover:bg-zinc-900 transition-colors"
                >
                  <Plus size={13} weight="bold" /> Adicionar
                </button>
              </div>
              {erroHorarioDesktop && (
                <span className="text-[11px] text-rose-500 font-semibold px-1">{erroHorarioDesktop}</span>
              )}
            </form>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {tarefasDoContextoDesktop.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 text-xs py-16 border border-dashed border-zinc-200 rounded-xl">
                <p>Nenhuma tarefa ativa em #{caminhoSelecionado}.</p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Use o campo acima para adicionar uma nova tarefa nesta pasta.
                </p>
              </div>
            ) : (
              tarefasDoContextoDesktop.map((tarefa) => (
                <CardTarefaContexto
                  key={tarefa.id}
                  tarefa={tarefa}
                  editandoId={editandoIdDesktop}
                  textoEdicao={textoEdicaoDesktop}
                  setTextoEdicao={setTextoEdicaoDesktop}
                  setEditandoId={setEditandoIdDesktop}
                  iniciarEdicao={iniciarEdicaoDesktop}
                  salvarEdicao={salvarEdicaoDesktop}
                  alternarPrioridade={alternarPrioridade}
                  onRemoverTarefa={removerTarefa}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
