import React, { useState } from 'react';
import { 
  Sparkle, 
  Clock, 
  ArrowsClockwise, 
  Target, 
  FolderSimple, 
  NotePencil,
  WarningCircle,
  CheckCircle,
  Lightbulb,
  ArrowRight
} from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { THEME } from '../colors';

const ESTILO_KINDLE = {
  textAlign: 'justify',
  textJustify: 'inter-word',
  hyphens: 'auto',
  WebkitHyphens: 'auto',
  textAlignLast: 'left',
};

const TODOS_OS_ICONES = [
  {
    tag: '#treino',
    sinonimos: 'academia, musculação',
    icone: 'Barbell',
    descricao: 'Exercícios físicos, musculação e treinos',
  },
  {
    tag: '#financas',
    sinonimos: 'contas, financeiro',
    icone: 'CurrencyDollar',
    descricao: 'Contas, faturas, extratos e pagamentos',
  },
  {
    tag: '#casa/limpeza',
    sinonimos: 'limpeza, faxina',
    icone: 'Broom',
    descricao: 'Faxina, varrição e higienização do lar',
  },
  {
    tag: '#casa/manutencao',
    sinonimos: 'manutenção, consertos',
    icone: 'Hammer',
    descricao: 'Reparos técnicos, obras e ferramentas',
  },
  {
    tag: '#pessoal',
    sinonimos: 'autocuidado',
    icone: 'User',
    descricao: 'Compromissos pessoais, corte de cabelo e rotina',
  },
  {
    tag: '#estudos',
    sinonimos: 'estudo, cursos',
    icone: 'BookOpen',
    descricao: 'Leituras, aulas e prática de idiomas',
  },
  {
    tag: '#comprar',
    sinonimos: 'compras',
    icone: 'ShoppingCart',
    descricao: 'Lista de compras, mercado e aquisições',
  },
  {
    tag: '#alimentacao',
    sinonimos: 'comida, marmitas',
    icone: 'ForkKnife',
    descricao: 'Preparo de refeições, almoço e cardápio',
  },
  {
    tag: '#saude',
    sinonimos: 'médico, exames',
    icone: 'FirstAid',
    descricao: 'Consultas, exames de rotina e farmácia',
  },
  {
    tag: '#higiene',
    sinonimos: 'cuidados',
    icone: 'HandSoap',
    descricao: 'Higiene pessoal e reposição de produtos',
  },
  {
    tag: '#pc',
    sinonimos: 'computador, dev',
    icone: 'Cpu',
    descricao: 'Projetos, tecnologia e computação',
  },
  {
    tag: '#viagem',
    sinonimos: 'viagens, malas',
    icone: 'AirplaneTilt',
    descricao: 'Passagens, itinerários e viagens',
  },
  {
    tag: '#rua',
    sinonimos: 'externo, correios',
    icone: 'MapPin',
    descricao: 'Tarefas de rua, cartório e encomendas',
  },
  {
    tag: '#lazer',
    sinonimos: 'diversão, passeios',
    icone: 'Ticket',
    descricao: 'Cinema, teatro, eventos e passeios',
  },
  {
    tag: '#casa',
    sinonimos: 'lar, quintal',
    icone: 'House',
    descricao: 'Atividades e organização geral da residência',
  },
  {
    tag: '#agenda',
    sinonimos: 'com horário ou data',
    icone: 'Clock',
    descricao: 'Compromissos pontuais do dia ou calendário',
  },
  {
    tag: '#geral',
    sinonimos: 'sem tag especificada',
    icone: 'ClipboardText',
    descricao: 'Tarefas avulsas e anotações padrão',
  },
];

export default function ManualView() {
  const [secaoAtiva, setSecaoAtiva] = useState('regra');

  const abas = [
    { id: 'regra', label: 'Regra', corAtiva: 'bg-zinc-800 text-white border-zinc-800 shadow-sm' },
    { id: 'agenda', label: 'Agenda', corAtiva: 'bg-sky-100 text-sky-900 border-sky-300 font-bold shadow-sm' },
    { id: 'rotina', label: 'Rotina', corAtiva: 'bg-purple-100 text-purple-900 border-purple-300 font-bold shadow-sm' },
    { id: 'foco', label: 'Foco', corAtiva: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold shadow-sm' },
    { id: 'tags', label: 'Tags', corAtiva: 'bg-zinc-200 text-zinc-900 border-zinc-400 font-bold shadow-sm' },
    { id: 'notas', label: 'Notas', corAtiva: 'bg-amber-100 text-amber-950 border-amber-300 font-bold shadow-sm' },
  ];

  return (
    <div className="h-full w-full max-w-full min-w-0 flex flex-col overflow-hidden max-w-4xl mx-auto">
      {/* 1. CABEÇALHO */}
      <header className="shrink-0 pt-1 pb-1 w-full max-w-full min-w-0">
        <h1 className="text-base font-bold tracking-tight text-zinc-900">
          Manual de Instruções
        </h1>
        <p 
          lang="pt-BR" 
          style={ESTILO_KINDLE}
          className="text-xs text-zinc-600 mt-0.5 leading-relaxed"
        >
          O TaskFlow organiza seu dia a dia por meio de linguagem natural. Basta digitar o que você precisa fazer no campo superior e o sistema interpreta datas, horários e frequências de forma automática.
        </p>

        {/* 2. BARRA DE BOTÕES: Grade de 6 no celular e flex no PC */}
        <div className="grid grid-cols-6 gap-1 w-full sm:flex sm:items-center sm:gap-1.5 sm:w-auto pt-2 pb-0.5">
          {abas.map(({ id, label, corAtiva }) => {
            const ativo = secaoAtiva === id;
            return (
              <button
                key={id}
                onClick={() => setSecaoAtiva(id)}
                className={`w-full sm:w-auto px-0.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-center transition-all border ${
                  ativo
                    ? corAtiva
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </header>

      {/* 3. CARD CONTAINER FIXO: Encaixe simétrico acima da barra inferior */}
      <main className="flex-1 min-h-0 w-full max-w-full min-w-0 bg-white border border-zinc-200 rounded-2xl shadow-sm p-3.5 sm:p-5 mt-2 mb-2 overflow-y-auto no-scrollbar break-words">

        {/* SEÇÃO 1: REGRA */}
        {secaoAtiva === 'regra' && (
          <article className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
              <div className="p-1.5 rounded-lg bg-zinc-100 text-zinc-800">
                <Sparkle size={18} weight="bold" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900">Regra da Organização</h2>
                <p className="text-[11px] text-zinc-500">O critério automático de direcionamento do app</p>
              </div>
            </div>

            <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
              Você não precisa escolher pastas ou preencher formulários com vários campos para cada tarefa. O TaskFlow analisa o texto que você escreve e decide o destino exato da ação através de três perguntas diretas:
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-xs text-zinc-900">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-[11px] font-mono">1</span>
                  <span>Tem horário marcado ou data específica no calendário?</span>
                </div>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 pl-7 leading-relaxed">
                  A tarefa é direcionada para a sua <strong>Agenda</strong>. Ela só tem relevância no dia e momento determinados para acontecer.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-xs text-zinc-900">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-[11px] font-mono">2</span>
                  <span>Possui repetição, periodicidade ou período de execução?</span>
                </div>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 pl-7 leading-relaxed">
                  A tarefa é direcionada para o bloco de <strong>Rotina</strong>. São tarefas que formam seus hábitos e rituais contínuos (diários, semanais, quinzenais ou intercalados).
                </p>
              </div>

              <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-xs text-zinc-900">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-[11px] font-mono">3</span>
                  <span>É uma pendência avulsa, sem dia certo e sem repetição?</span>
                </div>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 pl-7 leading-relaxed">
                  A tarefa entra na sua fila de <strong>Foco</strong>. Ela aguarda na sequência prioritária para você executar uma coisa de cada vez, sem sobrecarga mental.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* SEÇÃO 2: AGENDA */}
        {secaoAtiva === 'agenda' && (
          <article className="space-y-4">
            <div className="flex items-center gap-2 border-b border-sky-100 pb-2.5">
              <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                <Clock size={18} weight="bold" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-sky-950">Agenda de Compromissos</h2>
                <p className="text-[11px] text-sky-700">Para tudo o que tem momento certo no calendário</p>
              </div>
            </div>

            <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
              O bloco de Agenda reúne seus compromissos pontuais. Sempre que você insere um horário ou uma data do calendário, o TaskFlow separa essa atividade dos seus afazeres comuns para garantir que você não perca o prazo.
            </p>

            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-zinc-900">Compromissos com Horário Marcado</h3>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Utilize a preposição <strong>às</strong> ou o caractere <strong>@</strong> acompanhado da hora. O sistema calcula automaticamente o tempo restante para o evento e mantém a lista em estrita ordem cronológica:
                </p>
                <div className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/70 font-mono text-xs text-sky-950 space-y-1">
                  <div>Dentista às 14:30</div>
                  <div>Alinhamento com equipe @10h #pc</div>
                  <div>Buscar encomenda às 17h #rua</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-zinc-900">Compromissos com Data Específica (Dia Inteiro)</h3>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Se um evento precisa acontecer em um dia específico, mas não tem hora cravada, digite a data no formato <strong>DD/MM</strong> ou mencione a palavra <strong>dia</strong>. O item ficará guardado e aparecerá no topo da sua Agenda na data correspondente com a etiqueta <strong>Dia todo</strong>:
                </p>
                <div className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/70 font-mono text-xs text-sky-950 space-y-1">
                  <div>Entregar declaração do imposto de renda dia 15/10 #financas</div>
                  <div>Pagar IPVA 20/01 #financas</div>
                  <div>Aniversário de casamento 12/06 #pessoal</div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* SEÇÃO 3: ROTINA */}
        {secaoAtiva === 'rotina' && (
          <article className="space-y-4">
            <div className="flex items-center gap-2 border-b border-purple-100 pb-2.5">
              <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                <ArrowsClockwise size={18} weight="bold" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-purple-950">Rotinas e Hábitos Contínuos</h2>
                <p className="text-[11px] text-purple-700">Manutenções, hábitos e ciclos periódicos</p>
              </div>
            </div>

            <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
              Diferente de uma tarefa comum que você conclui e esquece, a rotina foi desenhada para a manutenção contínua da sua vida. Você pode agendar tarefas para dias fixos, intervalos espaçados ou janelas de oportunidade.
            </p>

            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-zinc-900">1. Dias Fixos da Semana ("Todo" ou "Toda")</h3>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Ideal para compromissos que ocorrem sempre no mesmo dia da semana ou diariamente:
                </p>
                <div className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 font-mono text-xs text-purple-950 space-y-1">
                  <div>Limpar calhas todo sábado #casa/manutencao</div>
                  <div>Revisão semanal toda sexta-feira #estudos</div>
                  <div>Regar as plantas todos os dias</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-zinc-900">2. Janelas de Execução (Início e Fim)</h3>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Para rituais que não precisam ser feitos em um dia exato, mas devem ser concluídos dentro de um determinado intervalo de tempo:
                </p>
                <div className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 font-mono text-xs text-purple-950 space-y-1">
                  <div>Limpeza geral de segunda à sexta #casa/limpeza</div>
                  <div>Tirar o lixo até terça #casa</div>
                  <div>Pintura do portão começando sábado terminando domingo</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-zinc-900">3. Intervalos e Semanas Intercaladas</h3>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Para atividades quinzenais ou rituais em que você quer trabalhar uma semana sim e outra não:
                </p>
                <div className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 font-mono text-xs text-purple-950 space-y-1">
                  <div>Limpar academia de segunda à sexta a cada 14 dias #treino</div>
                  <div>Conferir contas a cada 2 dias #financas</div>
                  <div>Higienização profunda quinzenalmente #higiene</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 text-zinc-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-xs text-rose-700">
                  <WarningCircle size={16} />
                  <span>O que acontece se você não concluir a rotina no prazo?</span>
                </div>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
                  A tarefa <strong>nunca some da tela</strong> e não se multiplica em dezenas de tarefas acumuladas. Quando o prazo expira, ela ganha o selo de alerta <strong>Pendente</strong> e é fixada no <strong>topo absoluto do bloco</strong> até ser resolvida.
                </p>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
                  Havendo mais de uma rotina pendente, o TaskFlow as organiza por urgência: tarefas com prioridade <strong>P1</strong> assumem a frente, seguidas por <strong>P2</strong> e <strong>P3</strong>, mantendo as tarefas dentro do prazo na sequência normal logo abaixo.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* SEÇÃO 4: FOCO */}
        {secaoAtiva === 'foco' && (
          <article className="space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-100 pb-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Target size={18} weight="bold" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-emerald-950">Fila de Foco</h2>
                <p className="text-[11px] text-emerald-700">Execução sequencial sem distrações</p>
              </div>
            </div>

            <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
              A fila de Foco foi projetada para combater a paralisia causada por listas gigantescas. Se a tarefa é avulsa, sem data e sem repetição, ela aguarda a sua vez na fila.
            </p>

            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-zinc-900">Como funciona o painel de Foco</h3>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Em vez de bombardear você com dezenas de pendências, o TaskFlow apresenta exatamente <strong>1 tarefa em destaque principal</strong> e até <strong>2 tarefas no radar</strong> (que mostram o que vem logo em seguida).
                </p>
              </div>

              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <CheckCircle size={16} />
                  <span>Ações Disponíveis na Tarefa Principal</span>
                </div>
                <ul className="text-xs text-zinc-700 space-y-1.5 pl-1">
                  <li>• <strong>Concluir:</strong> Finaliza a tarefa imediatamente e traz a próxima da fila para a posição de destaque.</li>
                  <li>• <strong>Pular para depois:</strong> Envia a tarefa atual para o fim da fila de foco, permitindo que a próxima tome a frente sem perder seu progresso.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-zinc-900">Exemplos de Tarefas de Foco</h3>
                <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 font-mono text-xs text-emerald-950 space-y-1">
                  <div>Comprar lâmpada para a garagem #casa/manutencao</div>
                  <div>Escrever relatório de desempenho #pc</div>
                  <div>Comprar pó de café e açúcar</div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* SEÇÃO 5: TAGS & ÍCONES RENDERIZADOS */}
        {secaoAtiva === 'tags' && (
          <article className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
              <div className="p-1.5 rounded-lg bg-zinc-100 text-zinc-700">
                <FolderSimple size={18} weight="bold" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900">Pastas, Categorias e Ícones</h2>
                <p className="text-[11px] text-zinc-500">Mapeamento visual completo dos contextos do aplicativo</p>
              </div>
            </div>

            <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
              Ao digitar uma hashtag em qualquer lugar do texto, o TaskFlow organiza a tarefa na pasta temática correspondente e aplica o ícone automaticamente.
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Todos os 17 Ícones Disponíveis
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {TODOS_OS_ICONES.map((item) => (
                  <div
                    key={item.icone}
                    className="p-2.5 rounded-xl border border-zinc-200/90 bg-zinc-50/70 flex items-center justify-between gap-3 hover:bg-zinc-50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono font-bold text-xs text-zinc-900">
                          {item.tag}
                        </span>
                        {item.sinonimos && (
                          <span className="text-[10px] text-zinc-400 font-mono">
                            ({item.sinonimos})
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-600 truncate mt-0.5">
                        {item.descricao}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200/90 shadow-2xs flex items-center justify-center text-zinc-800 shrink-0">
                      <DynamicIcon name={item.icone} size={18} weight="bold" />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-zinc-500 pt-1">
                * Em pastas compostas como <strong>#casa/limpeza</strong> ou <strong>#casa/manutencao</strong>, o sistema prioriza o ícone da subpasta mais específica (cascata bottom-up).
              </p>
            </div>
          </article>
        )}

        {/* SEÇÃO 6: NOTAS */}
        {secaoAtiva === 'notas' && (
          <article className="space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-100 pb-2.5">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <NotePencil size={18} weight="bold" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-amber-950">Aba de Notas e Planejamento</h2>
                <p className="text-[11px] text-amber-700">Rascunhos livres que se transformam em tarefas com um toque</p>
              </div>
            </div>

            <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-700 leading-relaxed">
              A aba de Notas funciona como seu bloco de anotações dinâmico. É o espaço perfeito para reuniões, listas de compras provisórias, rascunhos de planos ou pensamentos livres que ainda não foram estruturados.
            </p>

            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-zinc-900">Transformando Anotações em Tarefas Reais</h3>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Abaixo do editor da nota, cada linha escrita é tratada como um item independente. Ao lado de cada frase existe um botão de ação rápida:
                </p>
                <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2 text-xs text-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-semibold text-[11px]">Criar Tarefa</span>
                    <ArrowRight size={14} className="text-zinc-400" />
                    <span>Envia a linha para o interpretador do TaskFlow, cadastrando-a no sistema imediatamente.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">Adicionada</span>
                    <ArrowRight size={14} className="text-zinc-400" />
                    <span>O botão se transforma de forma permanente, informando visualmente que aquela pendência já foi despachada para suas listas.</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/80 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-800">
                  <Lightbulb size={16} className="text-amber-600" />
                  <span>Dica de Produtividade</span>
                </div>
                <p lang="pt-BR" style={ESTILO_KINDLE} className="text-xs text-zinc-600 leading-relaxed">
                  Você pode escrever as linhas da sua nota já utilizando as regras normais do app (como <em>Trocar bateria às 15h #rua</em> ou <em>Revisar contrato todo sábado</em>). Ao tocar no botão de envio, o sistema respeitará os horários, tags e periodicidades normalmente.
                </p>
              </div>
            </div>
          </article>
        )}

      </main>
    </div>
  );
}
