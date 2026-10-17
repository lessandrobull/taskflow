# 🖨️ TASKFLOW_DUMPER.md
Snapshot técnico gerado automaticamente com a estrutura e código da plataforma.

## 1. ÁRVORE DE DIRETÓRIOS
./.gitignore
./eslint.config.js
./index.html
./package.json
./package-lock.json
./public/favicon.svg
./public/icons.svg
./public/pwa-192x192.png
./public/pwa-512x512.png
./README.md
./src/App.css
./src/App.jsx
./src/assets/hero.png
./src/assets/react.svg
./src/assets/vite.svg
./src/colors.js
./src/components/BottomNav.jsx
./src/components/DynamicIcon.jsx
./src/components/QuickInput.jsx
./src/index.css
./src/main.jsx
./src/services/calendar.js
./src/services/supabase.js
./src/types.js
./src/useNotes.js
./src/useTasks.js
./src/utils/parser.js
./src/utils/tree.js
./src/views/ContextsView.jsx
./src/views/GlobalQueueView.jsx
./src/views/ManualView.jsx
./src/views/NotesView.jsx
./src/views/TodayView.jsx
./TASKFLOW_MASTER.md
./vite.config.js

## 2. CÓDIGO FONTE INTEGRAL


### 📄 ARQUIVO: ./.gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
dev-dist/

### 📄 ARQUIVO: ./eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])


### 📄 ARQUIVO: ./index.html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>TaskFlow</title>
    
    <!-- Meta tags PWA -->
    <meta name="theme-color" content="#09090b" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="TaskFlow" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

### 📄 ARQUIVO: ./package.json
{
  "name": "taskflow",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@phosphor-icons/react": "^2.1.10",
    "@supabase/supabase-js": "^2.117.3",
    "@tailwindcss/vite": "^4.3.3",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "^10.6.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "postcss": "^8.5.30",
    "tailwindcss": "^4.3.3",
    "vite": "^8.3.0",
    "vite-plugin-pwa": "^2.0.0"
  }
}


### 📄 ARQUIVO: ./README.md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


### 📄 ARQUIVO: ./src/App.css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}


### 📄 ARQUIVO: ./src/App.jsx
import React, { useState, useEffect } from 'react';
import { useTasks } from './useTasks';
import { useNotes } from './useNotes';
import TodayView from './views/TodayView';
import GlobalQueueView from './views/GlobalQueueView';
import ContextsView from './views/ContextsView';
import NotesView from './views/NotesView';
import ManualView from './views/ManualView';
import BottomNav from './components/BottomNav';
import QuickInput from './components/QuickInput';
import { THEME } from './colors';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState(() => {
    return sessionStorage.getItem('taskflow_aba_ativa') || 'hoje';
  });

  useEffect(() => {
    sessionStorage.setItem('taskflow_aba_ativa', abaAtiva);
  }, [abaAtiva]);
  const {
    tarefas,
    toggleConcluir,
    pularParaDepois,
    removerTarefa,
    limparConcluidos,
    editarTarefa,
    moverParaCima,
    moverParaBaixo,
    alternarPrioridade,
    adicionarTarefa,
  } = useTasks();

  const {
    notas,
    notaAtiva,
    notaAtivaId,
    setNotaAtivaId,
    criarNota,
    atualizarNota,
    removerNota,
  } = useNotes();

  return (
    <div className={`h-dvh flex flex-col font-sans overflow-hidden ${THEME.app.bg} ${THEME.app.text}`}>
      <header className={`sticky top-0 z-10 border-b px-4 py-2.5 shrink-0 ${THEME.app.headerBg} ${THEME.app.headerBorder}`}>
        <div className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center gap-3">
          <span className={`font-bold text-sm tracking-tight ${THEME.app.headerTitle}`}>
            {abaAtiva === 'hoje' && 'Hoje'}
            {abaAtiva === 'fila' && 'Filas'}
            {abaAtiva === 'contextos' && 'Contextos'}
            {abaAtiva === 'notas' && 'Notas'}
            {abaAtiva === 'manual' && 'Manual'}
          </span>
          <QuickInput onAdicionar={adicionarTarefa} />
        </div>
      </header>

      <main
        className={`flex-1 max-w-md lg:max-w-6xl xl:max-w-7xl w-full mx-auto px-4 pt-3 pb-16 flex flex-col min-h-0 ${
          abaAtiva === 'hoje' || abaAtiva === 'notas' || abaAtiva === 'manual' ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        {abaAtiva === 'hoje' && (
          <TodayView
            tarefas={tarefas}
            toggleConcluir={toggleConcluir}
            pularParaDepois={pularParaDepois}
          />
        )}
        {abaAtiva === 'fila' && (
          <GlobalQueueView
            tarefas={tarefas}
            toggleConcluir={toggleConcluir}
            moverParaCima={moverParaCima}
            moverParaBaixo={moverParaBaixo}
            alternarPrioridade={alternarPrioridade}
            removerTarefa={removerTarefa}
            limparConcluidos={limparConcluidos}
          />
        )}
        {abaAtiva === 'contextos' && (
          <ContextsView
            tarefas={tarefas}
            adicionarTarefa={adicionarTarefa}
            alternarPrioridade={alternarPrioridade}
            editarTarefa={editarTarefa}
            removerTarefa={removerTarefa}
          />
        )}
        {abaAtiva === 'notas' && (
          <NotesView
            notas={notas}
            notaAtiva={notaAtiva}
            notaAtivaId={notaAtivaId}
            setNotaAtivaId={setNotaAtivaId}
            criarNota={criarNota}
            atualizarNota={atualizarNota}
            removerNota={removerNota}
            onAdicionarTarefa={adicionarTarefa}
            tarefas={tarefas}
          />
        )}
        {abaAtiva === 'manual' && (
          <ManualView />
        )}
      </main>

      <BottomNav abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
    </div>
  );
}


### 📄 ARQUIVO: ./src/colors.js
export const THEME = {
  // Estrutura Geral
  app: {
    bg: 'bg-white',
    text: 'text-zinc-900',
    headerBg: 'bg-white/95 backdrop-blur-md',
    headerBorder: 'border-zinc-200',
    headerTitle: 'text-zinc-900',
  },

  // Barra Inferior (BottomNav)
  nav: {
    bg: 'bg-white/95 backdrop-blur-md',
    border: 'border-zinc-200',
    itemAtivo: 'text-zinc-950 font-bold',
    itemInativo: 'text-zinc-400 hover:text-zinc-600',
  },

  // Input Rápido do Topo (QuickInput)
  quickInput: {
    bg: 'bg-zinc-50',
    border: 'border-zinc-300',
    borderFocus: 'focus:border-zinc-500',
    text: 'text-zinc-900',
    placeholder: 'placeholder-zinc-400',
    btn: 'text-zinc-400 hover:text-zinc-800',
  },

  // Bloco 1: Agenda (Azul Celeste)
  agendados: {
    titulo: 'text-sky-700',
    cardBg: 'bg-sky-50',
    cardBorder: 'border-sky-200/90',
    icone: 'text-sky-600',
    texto: 'text-sky-950',
    horario: 'text-sky-900',
    tempoRestante: 'text-sky-600',
  },

  // Bloco 2: Rotina (Violeta / Púrpura)
  rotina: {
    titulo: 'text-purple-700',
    cardBg: 'bg-purple-50/80',
    cardBorder: 'border-purple-200 hover:border-purple-300',
    icone: 'text-purple-600',
    texto: 'text-purple-950',
    checkBtn: 'text-purple-400 hover:text-purple-600',
    alertaAtrasado: 'bg-rose-100 text-rose-700 border-rose-200',
    p1: 'bg-purple-100 text-purple-800 border-purple-300',
    p2: 'bg-purple-50 text-purple-700 border-purple-200',
    p3: 'bg-zinc-100 text-zinc-600 border-zinc-300',
  },

  // Bloco 3: Foco (Verde Esmeralda)
  foco: {
    titulo: 'text-emerald-800',
    principalBg: 'bg-emerald-50/70',
    principalBorder: 'border-emerald-300/80',
    principalIcone: 'text-emerald-800',
    principalTexto: 'text-zinc-900',
    principalDivisor: 'border-emerald-200',
    concluirBtn: 'bg-[#45818e] text-white hover:bg-[#386b76] border border-[#386b76]/80 shadow-sm',
    pularBtn: 'text-zinc-500 hover:text-zinc-800',
    vazioBg: 'bg-zinc-50 border-zinc-300 text-zinc-500',
    radarTitulo: 'text-zinc-500',
    radarBg: 'bg-emerald-50/40',
    radarBorder: 'border-emerald-200/80',
    radarNumero: 'text-emerald-700',
    radarIcone: 'text-emerald-700',
    radarTexto: 'text-zinc-800',
    raio: 'text-emerald-600',
    p1: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    p2: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    p3: 'bg-zinc-100 text-zinc-600 border-zinc-300',
  },

  // Página de Contextos
  contextos: {
    cabecalhoTitulo: 'text-zinc-700',
    cabecalhoSubtitulo: 'text-zinc-500',
    divisor: 'border-zinc-200',
    linhaHover: 'hover:bg-zinc-100',
    setaIcone: 'text-zinc-500',
    pastaAbertaIcone: 'text-zinc-400',
    pastaFechadaIcone: 'text-zinc-400',
    pastaNome: 'text-zinc-800',
    contador: 'text-zinc-400',
    addBtn: 'text-zinc-400 hover:text-zinc-800',
    bordaArvore: 'border-zinc-200',

    // Foco (Verde)
    tarefaBg: 'bg-emerald-50/40',
    tarefaBorder: 'border-emerald-200/80 hover:border-emerald-300',
    tarefaTexto: 'text-zinc-800',
    tarefaIcone: 'text-emerald-700',

    // Rotina (Violeta)
    rotinaBg: 'bg-purple-50/60',
    rotinaBorder: 'border-purple-200 hover:border-purple-300',
    rotinaTexto: 'text-purple-950',
    rotinaIcone: 'text-purple-600',

    // Agenda (Azul Celeste)
    agendaBg: 'bg-sky-50/60',
    agendaBorder: 'border-sky-200 hover:border-sky-300',
    agendaTexto: 'text-sky-950',
    agendaIcone: 'text-sky-600',

    concluidaBg: 'bg-zinc-100/70 border-zinc-200 opacity-40',
    concluidaTexto: 'line-through text-zinc-400',

    checkInativo: 'text-zinc-400 hover:text-emerald-600',
    checkAtivo: 'text-emerald-600',
    horarioTexto: 'text-zinc-500',
    editarBtn: 'text-zinc-400 hover:text-zinc-800',
    excluirBtn: 'text-zinc-400 hover:text-rose-600',

    p1: 'bg-rose-100 text-rose-700 border-rose-300',
    p2: 'bg-amber-100 text-amber-700 border-amber-300',
    p3: 'bg-zinc-100 text-zinc-600 border-zinc-300',
  },

  // Página de Notas (Âmbar / Laranja)
  notas: {
    cabecalhoTitulo: 'text-amber-800',
    divisor: 'border-zinc-200',
    abaAtiva: 'bg-amber-50 text-amber-950 border-amber-300 shadow-sm font-bold',
    abaInativa: 'text-zinc-500 hover:text-zinc-800 border-zinc-200 bg-white',
    addBtn: 'text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100',
    editorBg: 'bg-amber-50/20',
    editorBorder: 'border-amber-200/90 focus:border-amber-400',
    editorTexto: 'text-zinc-900',
    editorPlaceholder: 'placeholder-zinc-400',
    cardLinhaBg: 'bg-white',
    cardLinhaBorder: 'border-zinc-200 hover:border-amber-300 shadow-sm',
    cardLinhaTexto: 'text-zinc-800',
    converterBtn: 'bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-300',
    msgSucesso: 'text-emerald-700 font-semibold',
  },
};


### 📄 ARQUIVO: ./src/components/BottomNav.jsx
import React from 'react';
import { CalendarBlank, ListNumbers, TreeStructure, NotePencil, BookOpen } from '@phosphor-icons/react';
import { THEME } from '../colors';

export default function BottomNav({ abaAtiva, setAbaAtiva }) {
  const abas = [
    { id: 'hoje', label: 'Hoje', Icone: CalendarBlank },
    { id: 'fila', label: 'Filas', Icone: ListNumbers },
    { id: 'contextos', label: 'Tags', Icone: TreeStructure },
    { id: 'notas', label: 'Notas', Icone: NotePencil },
    { id: 'manual', label: 'Manual', Icone: BookOpen },
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
              className={`flex flex-col items-center gap-1 transition-colors ${ativo ? THEME.nav.itemAtivo : THEME.nav.itemInativo
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


### 📄 ARQUIVO: ./src/components/DynamicIcon.jsx
import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';

export default function DynamicIcon({ name, size = 18, weight = 'regular', className = '' }) {
  const nomeEfetivo = (!name || name === 'Circle') ? 'ClipboardText' : name;
  const IconComponent = PhosphorIcons[nomeEfetivo] || PhosphorIcons.ClipboardText || PhosphorIcons.Circle;
  return <IconComponent size={size} weight={weight} className={className} />;
}

### 📄 ARQUIVO: ./src/components/QuickInput.jsx
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

        {/* Placeholder translúcido suave */}
        {!texto && (
          <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-xs gap-1 select-none">
            {erroAgenda ? (
              <span className="text-rose-500 font-semibold">{erroAgenda}</span>
            ) : (
              <>
                <span className="text-emerald-600/45 font-normal">Tarefa</span>
                <span className="text-sky-600/45 font-normal">horário</span>
                <span className="text-purple-600/45 font-normal">frequência</span>
                <span className="text-zinc-400/90 font-normal">#contexto/sub-contexto</span>
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


### 📄 ARQUIVO: ./src/index.css
@import "tailwindcss";

body {
  background-color: #09090b;
  color: #f4f4f5;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Permitir seleção de texto apenas em campos editáveis e notas */
input, textarea {
  user-select: text;
}

/* Ocultar barra de scroll padrão mantendo a rolagem ativa */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

### 📄 ARQUIVO: ./src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


### 📄 ARQUIVO: ./src/services/calendar.js
const CALENDAR_API_URL = 'https://script.google.com/macros/s/AKfycbw-THy_M4YIxA90XcVRyea-eK-5xzgGzYnIQoofe5NYernRekJ6oK54Y01Zi4j04gaP/exec';

export async function buscarEventosHoje() {
  try {
    const resposta = await fetch(CALENDAR_API_URL);
    if (!resposta.ok) throw new Error('Falha ao consultar agenda');
    
    const eventos = await resposta.json();
    return Array.isArray(eventos) ? eventos : [];
  } catch (err) {
    console.error('Erro ao sincronizar com Google Calendar:', err);
    return [];
  }
}

### 📄 ARQUIVO: ./src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xttzilpuuqjbztjkeadd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dHppbHB1dXFqYnp0amtlYWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NDM1NDAsImV4cCI6MjEwNDMxOTU0MH0.JChW7np_UAGozYm_jaBS44dBKA9y3gX0Lj2SVdosxUY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


### 📄 ARQUIVO: ./src/types.js
export const PRIORIDADES = {
  P1: 'p1',
  P2: 'p2',
  P3: 'p3',
};

export const TIPOS_TAREFA = {
  AGENDADO: 'agendado',
  CADENCIA: 'cadencia',
  FOCO: 'foco',
};

export const DADOS_INICIAIS = [
  {
    id: 'task-1',
    titulo: 'Dentista (Consulta periódica)',
    icone: 'Tooth',
    contexto: 'saude/consultas',
    tipo: TIPOS_TAREFA.AGENDADO,
    horario: '14:00',
    cadencia: null,
    prioridade: PRIORIDADES.P2,
    ordemFila: 0,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-2',
    titulo: 'Aula de Inglês (Mari)',
    icone: 'ChalkboardTeacher',
    contexto: 'agenda',
    tipo: TIPOS_TAREFA.AGENDADO,
    horario: '16:30',
    cadencia: null,
    prioridade: PRIORIDADES.P1,
    ordemFila: 0,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-3',
    titulo: 'Colocar o lixo para fora',
    icone: 'Trash',
    contexto: 'casa/manutencao',
    tipo: TIPOS_TAREFA.CADENCIA,
    horario: '06:00',
    cadencia: { frequencia: 'dias_especificos', dias: [2, 4, 6] },
    prioridade: PRIORIDADES.P2,
    ordemFila: 1,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-4',
    titulo: 'Robô aspirador e passar pano',
    icone: 'Broom',
    contexto: 'casa/limpeza',
    tipo: TIPOS_TAREFA.CADENCIA,
    horario: null,
    cadencia: { frequencia: 'diaria' },
    prioridade: PRIORIDADES.P3,
    ordemFila: 2,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-5',
    titulo: 'QuizHub: Ajustar geração de quizzes',
    icone: 'Cpu',
    contexto: 'pc/desenvolvimento/quizhub',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P1,
    ordemFila: 1,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-6',
    titulo: 'Telhado: Colar pedaços das telhas e manta',
    icone: 'Hammer',
    contexto: 'casa/obras externas/telhado',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P1,
    ordemFila: 2,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-7',
    titulo: 'HOS: Fatorar god component em módulos',
    icone: 'Cpu',
    contexto: 'pc/estudos/pos',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P2,
    ordemFila: 3,
    concluido: false,
    concluidoEm: null,
  },
  {
    id: 'task-8',
    titulo: 'Prateleiras no canto do jardim',
    icone: 'Wrench',
    contexto: 'casa/jardim',
    tipo: TIPOS_TAREFA.FOCO,
    horario: null,
    cadencia: null,
    prioridade: PRIORIDADES.P3,
    ordemFila: 4,
    concluido: false,
    concluidoEm: null,
  },
];


### 📄 ARQUIVO: ./src/useNotes.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'taskflow_notas_v1';

const NOTA_PADRAO = [
  {
    id: 'nota-padrao',
    titulo: 'Notas',
    conteudo: 'Ideias soltas, comandos e rascunhos rápidos:\n\n- Comprar parafusos 6mm #casa/manutencao\n- Revisar endpoints de áudio do app\n- Checar status da entrega',
    atualizadoEm: new Date().toISOString(),
  },
];

export function useNotes() {
  const [notas, setNotas] = useState(() => {
    try {
      const salvas = localStorage.getItem(STORAGE_KEY);
      if (salvas) {
        const parsed = JSON.parse(salvas);
        // Migração automática de 'Scratchpad Geral' para 'Notas'
        return parsed.map((n) =>
          n.titulo === 'Scratchpad Geral' ? { ...n, titulo: 'Notas' } : n
        );
      }
      return NOTA_PADRAO;
    } catch {
      return NOTA_PADRAO;
    }
  });

  const [notaAtivaId, setNotaAtivaId] = useState(() => notas[0]?.id || null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
    } catch (err) {
      console.error('Falha ao gravar notas no localStorage:', err);
    }
  }, [notas]);

  const criarNota = () => {
    const nova = {
      id: `nota-${Date.now()}`,
      titulo: '',
      conteudo: '',
      atualizadoEm: new Date().toISOString(),
    };
    setNotas((prev) => [nova, ...prev]);
    setNotaAtivaId(nova.id);
  };

  const atualizarNota = (id, campos) => {
    setNotas((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...campos, atualizadoEm: new Date().toISOString() }
          : n
      )
    );
  };

  const removerNota = (id) => {
    const restantes = notas.filter((n) => n.id !== id);
    setNotas(restantes);
    if (notaAtivaId === id) {
      setNotaAtivaId(restantes[0]?.id || null);
    }
  };

  const notaAtiva = notas.find((n) => n.id === notaAtivaId) || null;

  return {
    notas,
    notaAtiva,
    notaAtivaId,
    setNotaAtivaId,
    criarNota,
    atualizarNota,
    removerNota,
  };
}


### 📄 ARQUIVO: ./src/useTasks.js
import { useState, useEffect } from 'react';
import { DADOS_INICIAIS, TIPOS_TAREFA, PRIORIDADES } from './types';
import { buscarEventosHoje } from './services/calendar';
import { supabase } from './services/supabase';

const STORAGE_KEY = 'taskflow_tarefas_v1';

function formatarDataISO(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function useTasks() {
  const [tarefas, setTarefas] = useState(() => {
    try {
      const salvas = localStorage.getItem(STORAGE_KEY);
      return salvas ? JSON.parse(salvas) : DADOS_INICIAIS;
    } catch {
      return DADOS_INICIAIS;
    }
  });

  const [sincronizandoAgenda, setSincronizandoAgenda] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (err) {
      console.error('Falha ao gravar no localStorage:', err);
    }
  }, [tarefas]);

  useEffect(() => {
    async function carregarDoSupabase() {
      try {
        const { data, error } = await supabase.from('tarefas').select('*');
        if (!error && data && data.length > 0) {
          setTarefas(data);
        } else if (!error && data && data.length === 0) {
          const locais = (() => {
            try {
              const s = localStorage.getItem(STORAGE_KEY);
              return s ? JSON.parse(s) : DADOS_INICIAIS;
            } catch {
              return DADOS_INICIAIS;
            }
          })();
          if (locais.length > 0) {
            await supabase.from('tarefas').upsert(locais);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar dados do Supabase:', err);
      }
    }

    carregarDoSupabase();

    const canal = supabase
      .channel('tarefas-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tarefas' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTarefas((prev) => {
              if (prev.some((t) => t.id === payload.new?.id)) return prev;
              return payload.new ? [...prev, payload.new] : prev;
            });
          } else if (payload.eventType === 'UPDATE') {
            if (payload.new?.id) {
              setTarefas((prev) =>
                prev.map((t) => (t.id === payload.new.id ? payload.new : t))
              );
            }
          } else if (payload.eventType === 'DELETE') {
            if (payload.old?.id) {
              setTarefas((prev) => prev.filter((t) => t.id !== payload.old.id));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  const sincronizarAgenda = async () => {
    setSincronizandoAgenda(true);
    try {
      const eventos = await buscarEventosHoje();
      if (eventos.length > 0) {
        setTarefas((prev) => {
          const idsExistentes = new Set(prev.map((t) => t.id));

          const novosItens = eventos
            .filter((ev) => !idsExistentes.has(`gcal-${ev.id}`))
            .map((ev) => ({
              id: `gcal-${ev.id}`,
              titulo: ev.titulo,
              icone: 'Clock',
              contexto: 'agenda',
              tipo: TIPOS_TAREFA.AGENDADO,
              horario: ev.horario,
              cadencia: null,
              proximaData: null,
              prioridade: PRIORIDADES.P1,
              ordemFila: 0,
              concluido: false,
              concluidoEm: null,
            }));

          if (novosItens.length > 0) {
            (async () => {
              try {
                await supabase.from('tarefas').upsert(novosItens);
              } catch (e) {
                console.error('Falha ao subir eventos para o Supabase:', e);
              }
            })();
          }

          return [...novosItens, ...prev];
        });
      }
    } finally {
      setSincronizandoAgenda(false);
    }
  };

  useEffect(() => {
    sincronizarAgenda();
  }, []);

  const toggleConcluir = (id) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    let atualizacao = {};

    if (itemAtual.tipo === TIPOS_TAREFA.CADENCIA) {
      const intervalo = itemAtual.cadencia?.intervaloDias || 7;
      let novaDataInicio = null;
      let novaDataLimite = null;
      let proxima = new Date();

      if (itemAtual.cadencia?.dataInicio && itemAtual.cadencia?.dataLimite) {
        const dtIni = new Date(`${itemAtual.cadencia.dataInicio}T00:00:00`);
        const dtLim = new Date(`${itemAtual.cadencia.dataLimite}T00:00:00`);
        dtIni.setDate(dtIni.getDate() + intervalo);
        dtLim.setDate(dtLim.getDate() + intervalo);
        novaDataInicio = formatarDataISO(dtIni);
        novaDataLimite = formatarDataISO(dtLim);
        proxima = dtIni;
      } else {
        proxima.setDate(proxima.getDate() + intervalo);
      }

      const novaCadencia = itemAtual.cadencia
        ? {
            ...itemAtual.cadencia,
            ...(novaDataInicio && { dataInicio: novaDataInicio }),
            ...(novaDataLimite && { dataLimite: novaDataLimite }),
          }
        : null;

      atualizacao = {
        concluido: false,
        proximaData: formatarDataISO(proxima),
        cadencia: novaCadencia,
        concluidoEm: new Date().toISOString(),
      };
    } else {
      const novoConcluido = !itemAtual.concluido;
      atualizacao = {
        concluido: novoConcluido,
        concluidoEm: novoConcluido ? new Date().toISOString() : null,
      };
    }

    const tarefaAtualizada = { ...itemAtual, ...atualizacao };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao atualizar conclusao no Supabase:', e);
      }
    })();
  };

  const pularParaDepois = (id) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual || itemAtual.tipo !== TIPOS_TAREFA.FOCO) return;

    const filaFoco = tarefas
      .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    if (filaFoco.length <= 1) return;

    const maiorOrdem = filaFoco[filaFoco.length - 1].ordemFila || filaFoco.length;
    const tarefaAtualizada = {
      ...itemAtual,
      ordemFila: maiorOrdem + 1,
    };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao pular tarefa no Supabase:', e);
      }
    })();
  };

  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
    (async () => {
      try {
        await supabase.from('tarefas').delete().eq('id', id);
      } catch (e) {
        console.error('Falha ao remover tarefa no Supabase:', e);
      }
    })();
  };

  const limparConcluidos = () => {
    setTarefas((prev) => prev.filter((t) => !t.concluido));
    (async () => {
      try {
        await supabase.from('tarefas').delete().eq('concluido', true);
      } catch (e) {
        console.error('Falha ao limpar concluidas no Supabase:', e);
      }
    })();
  };

  const editarTarefa = (id, novosDados) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const tarefaAtualizada = { ...itemAtual, ...novosDados };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao editar tarefa no Supabase:', e);
      }
    })();
  };

  const moverParaCima = (id) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const fila = tarefas
      .filter((t) => t.tipo === itemAtual.tipo && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index <= 0) return;

    const itemAcima = fila[index - 1];

    const atual1 = { ...itemAtual, ordemFila: itemAcima.ordemFila };
    const atual2 = { ...itemAcima, ordemFila: itemAtual.ordemFila };

    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === itemAtual.id) return atual1;
        if (t.id === itemAcima.id) return atual2;
        return t;
      })
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert([atual1, atual2]);
      } catch (e) {
        console.error('Falha ao reordenar tarefa no Supabase:', e);
      }
    })();
  };

  const moverParaBaixo = (id) => {
    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const fila = tarefas
      .filter((t) => t.tipo === itemAtual.tipo && !t.concluido)
      .sort((a, b) => a.ordemFila - b.ordemFila);

    const index = fila.findIndex((t) => t.id === id);
    if (index === -1 || index >= fila.length - 1) return;

    const itemAbaixo = fila[index + 1];

    const atual1 = { ...itemAtual, ordemFila: itemAbaixo.ordemFila };
    const atual2 = { ...itemAbaixo, ordemFila: itemAtual.ordemFila };

    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === itemAtual.id) return atual1;
        if (t.id === itemAbaixo.id) return atual2;
        return t;
      })
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert([atual1, atual2]);
      } catch (e) {
        console.error('Falha ao reordenar tarefa no Supabase:', e);
      }
    })();
  };

  const alternarPrioridade = (id) => {
    const ciclo = {
      [PRIORIDADES.P1]: PRIORIDADES.P2,
      [PRIORIDADES.P2]: PRIORIDADES.P3,
      [PRIORIDADES.P3]: PRIORIDADES.P1,
    };

    const itemAtual = tarefas.find((t) => t.id === id);
    if (!itemAtual) return;

    const tarefaAtualizada = {
      ...itemAtual,
      prioridade: ciclo[itemAtual.prioridade] || PRIORIDADES.P2,
    };

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? tarefaAtualizada : t))
    );

    (async () => {
      try {
        await supabase.from('tarefas').upsert(tarefaAtualizada);
      } catch (e) {
        console.error('Falha ao alterar prioridade no Supabase:', e);
      }
    })();
  };

  const adicionarTarefa = ({
    titulo,
    icone = 'ClipboardText',
    contexto = 'geral',
    tipo = TIPOS_TAREFA.FOCO,
    horario = null,
    cadencia = null,
    proximaData = null,
    prioridade = PRIORIDADES.P2,
  }) => {
    const nova = {
      id: `task-${Date.now()}`,
      titulo,
      icone,
      contexto,
      tipo,
      horario,
      cadencia,
      proximaData:
        proximaData ||
        (tipo === TIPOS_TAREFA.CADENCIA ? formatarDataISO(new Date()) : null),
      prioridade,
      ordemFila: tarefas.filter((t) => t.tipo === tipo).length + 1,
      concluido: false,
      concluidoEm: null,
    };

    setTarefas((prev) => [...prev, nova]);

    (async () => {
      try {
        await supabase.from('tarefas').insert(nova);
      } catch (e) {
        console.error('Falha ao inserir tarefa no Supabase:', e);
      }
    })();
  };

  return {
    tarefas,
    sincronizandoAgenda,
    sincronizarAgenda,
    toggleConcluir,
    pularParaDepois,
    removerTarefa,
    limparConcluidos,
    editarTarefa,
    moverParaCima,
    moverParaBaixo,
    alternarPrioridade,
    adicionarTarefa,
  };
}


### 📄 ARQUIVO: ./src/utils/parser.js
import { TIPOS_TAREFA, PRIORIDADES } from '../types.js';

export const MAPA_ICONES_PASTAS = {
  // Pessoal
  pessoal: 'User',
  // Treino
  treino: 'Barbell',
  treinos: 'Barbell',
  academia: 'Barbell',
  musculacao: 'Barbell',
  musculação: 'Barbell',

  // Finanças
  financas: 'CurrencyDollar',
  finanças: 'CurrencyDollar',
  financeiro: 'CurrencyDollar',
  contas: 'CurrencyDollar',

  // Viagens
  viagem: 'AirplaneTilt',
  viagens: 'AirplaneTilt',

  // Limpeza
  limpeza: 'Broom',
  faxina: 'Broom',

  // Manutenção
  manutencao: 'Hammer',
  manutenção: 'Hammer',

  // Rua
  rua: 'MapPin',

  // PC / Computador
  pc: 'Cpu',
  computador: 'Cpu',

  // Agenda
  agenda: 'Clock',

  // Comprar
  comprar: 'ShoppingCart',
  compras: 'ShoppingCart',

  // Estudos
  estudos: 'BookOpen',
  estudo: 'BookOpen',

  // Higiene
  higiene: 'HandSoap',
  cuidados: 'HandSoap',

  // Saúde
  saude: 'FirstAid',
  saúde: 'FirstAid',
  medico: 'FirstAid',
  médico: 'FirstAid',

  // Alimentação
  alimentacao: 'ForkKnife',
  alimentação: 'ForkKnife',
  comida: 'ForkKnife',
  refeicao: 'ForkKnife',
  refeição: 'ForkKnife',
  mercado: 'ForkKnife',

  // Lazer
  lazer: 'Ticket',
  diversao: 'Ticket',
  diversão: 'Ticket',

  // Casa
  casa: 'House',
};

export function resolverIconePorContexto(contexto, tipo) {
  if (tipo === TIPOS_TAREFA.AGENDADO && (!contexto || contexto === 'geral' || contexto === 'agenda')) {
    return 'Clock';
  }

  if (!contexto || contexto.trim().toLowerCase() === 'geral') {
    return 'ClipboardText';
  }

  // Cascata bottom-up: testa da subpasta mais profunda até a raiz
  const niveis = contexto
    .toLowerCase()
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean)
    .reverse();

  for (const sub of niveis) {
    if (MAPA_ICONES_PASTAS[sub]) {
      return MAPA_ICONES_PASTAS[sub];
    }
  }

  return 'ClipboardText';
}

const DIAS_SEMANA = {
  domingo: 0,
  segunda: 1,
  'segunda-feira': 1,
  terca: 2,
  terça: 2,
  'terca-feira': 2,
  'terça-feira': 2,
  quarta: 3,
  'quarta-feira': 3,
  quinta: 4,
  'quinta-feira': 4,
  sexta: 5,
  'sexta-feira': 5,
  sabado: 6,
  sábado: 6,
};

const NUMEROS_EXTENSO = {
  um: 1,
  uma: 1,
  dois: 2,
  duas: 2,
  tres: 3,
  três: 3,
  quatro: 4,
  cinco: 5,
  seis: 6,
  sete: 7,
  oito: 8,
  nove: 9,
  dez: 10,
  quatorze: 14,
  catorze: 14,
  quinze: 15,
  vinte: 20,
  trinta: 30,
};

function formatarDataISO(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function calcularProximoDiaSemana(diaAlvo, dataReferencia = new Date()) {
  const hoje = new Date(dataReferencia);
  const diaAtual = hoje.getDay();
  let diff = diaAlvo - diaAtual;
  if (diff < 0) diff += 7;
  const alvo = new Date(hoje);
  alvo.setDate(hoje.getDate() + diff);
  return formatarDataISO(alvo);
}

function resolverTermoData(termo, dataBase = new Date()) {
  if (!termo) return null;
  const limpo = termo.trim().toLowerCase().replace(/^dia\s+/, '');

  if (DIAS_SEMANA[limpo] !== undefined) {
    return calcularProximoDiaSemana(DIAS_SEMANA[limpo], dataBase);
  }

  const matchBr = limpo.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/);
  if (matchBr) {
    const d = String(matchBr[1]).padStart(2, '0');
    const m = String(matchBr[2]).padStart(2, '0');
    const anoAtual = dataBase.getFullYear();
    const anoStr = matchBr[3]
      ? (matchBr[3].length === 2 ? `20${matchBr[3]}` : matchBr[3])
      : String(anoAtual);
    return `${anoStr}-${m}-${d}`;
  }

  return null;
}

export function processarInputRapido(textoBruto) {
  if (!textoBruto || !textoBruto.trim()) return null;

  let texto = textoBruto.trim();
  let contexto = 'geral';
  let horario = null;
  let tipo = TIPOS_TAREFA.FOCO;
  let cadencia = null;
  let proximaData = null;
  let dataInicio = null;
  let dataLimite = null;
  let ehRotina = false;
  let intervaloDias = 7;

  // 1. Extração de Horário (@14h, às 23h, as 23h, @14:30)
  const regexHorario = /(?:@|(?:\s|^)[a\u00e0\u00e1]s\s*)(\d{1,2}(?::\d{2}|h\d{2}|h)?)/i;
  const matchHorario = texto.match(regexHorario);
  if (matchHorario) {
    let raw = matchHorario[1].toLowerCase().replace('h', ':');
    if (!raw.includes(':')) raw += ':00';
    const [h, m] = raw.split(':');
    horario = `${String(h).padStart(2, '0')}:${String(m || '00').padStart(2, '0')}`;
    texto = texto.replace(matchHorario[0], '').trim();
    tipo = TIPOS_TAREFA.AGENDADO;
  }

  // 2. Extração de Contexto Unicode (#agenda, #casa/jardim)
  const regexContexto = /#([\p{L}\p{N}\s\-_/]+)(?:\s|$)/u;
  const matchContexto = texto.match(regexContexto);
  if (matchContexto) {
    contexto = matchContexto[1].trim().toLowerCase();
    texto = texto.replace(matchContexto[0], '').trim();
  }

  // 3. Reconhecimento de Janela de Rotina (Período com Início e Fim)
  // 3a. "de [dia/data] até/à [dia/data]"
  const regexDeAte = /\bde\s+(?:dia\s+)?([^\s]+)\s+(?:at[eé]|à|[aà])\s+(?:dia\s+)?([^\s]+)\b/i;
  const matchDeAte = texto.match(regexDeAte);

  // 3b. "começando [dia/data] terminando [dia/data]"
  const regexComecando = /\bcome[çc]ando(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\s+terminando(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\b/i;
  const matchComecando = texto.match(regexComecando);

  // 3c. "inicio [dia/data] limite [dia/data]"
  const regexInicioLimite = /\bin[ií]cio(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\s+limite(?:\s+(?:no|na|em|dia))?\s+([^\s]+)\b/i;
  const matchInicioLimite = texto.match(regexInicioLimite);

  // 3d. Apenas final: "até [dia/data]" ou "limite [dia/data]"
  const regexApenasAte = /\b(?:at[eé]|limite)(?:\s+dia)?\s+([^\s]+)\b/i;

  if (matchDeAte) {
    const dIni = resolverTermoData(matchDeAte[1]);
    const dFim = resolverTermoData(matchDeAte[2]);
    if (dIni && dFim) {
      ehRotina = true;
      dataInicio = dIni;
      dataLimite = dFim;
      if (dataLimite < dataInicio) {
        const dtAjuste = new Date(`${dataLimite}T00:00:00`);
        dtAjuste.setDate(dtAjuste.getDate() + 7);
        dataLimite = formatarDataISO(dtAjuste);
      }
      texto = texto.replace(matchDeAte[0], '').trim();
    }
  } else if (matchComecando) {
    const dIni = resolverTermoData(matchComecando[1]);
    const dFim = resolverTermoData(matchComecando[2]);
    if (dIni && dFim) {
      ehRotina = true;
      dataInicio = dIni;
      dataLimite = dFim;
      if (dataLimite < dataInicio) {
        const dtAjuste = new Date(`${dataLimite}T00:00:00`);
        dtAjuste.setDate(dtAjuste.getDate() + 7);
        dataLimite = formatarDataISO(dtAjuste);
      }
      texto = texto.replace(matchComecando[0], '').trim();
    }
  } else if (matchInicioLimite) {
    const dIni = resolverTermoData(matchInicioLimite[1]);
    const dFim = resolverTermoData(matchInicioLimite[2]);
    if (dIni && dFim) {
      ehRotina = true;
      dataInicio = dIni;
      dataLimite = dFim;
      if (dataLimite < dataInicio) {
        const dtAjuste = new Date(`${dataLimite}T00:00:00`);
        dtAjuste.setDate(dtAjuste.getDate() + 7);
        dataLimite = formatarDataISO(dtAjuste);
      }
      texto = texto.replace(matchInicioLimite[0], '').trim();
    }
  } else {
    const matchAte = texto.match(regexApenasAte);
    if (matchAte) {
      const dFim = resolverTermoData(matchAte[1]);
      if (dFim) {
        ehRotina = true;
        dataInicio = formatarDataISO(new Date());
        dataLimite = dFim;
        if (dataLimite < dataInicio) {
          const dtAjuste = new Date(`${dataLimite}T00:00:00`);
          dtAjuste.setDate(dtAjuste.getDate() + 7);
          dataLimite = formatarDataISO(dtAjuste);
        }
        texto = texto.replace(matchAte[0], '').trim();
      }
    }
  }

  // 3e. Reconhecimento de "todo [dia]" / "toda [dia]" / "todos os [dias]" / "todo dia"
  const regexTodo = /\btod[oa]s?\s+(?:os\s+|as\s+)?(dias?|domingos?|segundas?(?:-feiras?)?|ter[çc]as?(?:-feiras?)?|quartas?(?:-feiras?)?|quintas?(?:-feiras?)?|sextas?(?:-feiras?)?|s[aá]bados?)\b/i;
  const matchTodo = texto.match(regexTodo);
  if (matchTodo) {
    ehRotina = true;
    const termoBruto = matchTodo[1].toLowerCase();
    const termo = termoBruto.replace(/s(-feiras?)?$/, '$1').replace(/s$/, '');

    if (termo === 'dia') {
      intervaloDias = 1;
      dataInicio = formatarDataISO(new Date());
      dataLimite = dataInicio;
    } else {
      intervaloDias = 7;
      const dataAlvo = resolverTermoData(termo);
      if (dataAlvo) {
        dataInicio = dataAlvo;
        dataLimite = dataAlvo;
      }
    }
    texto = texto.replace(matchTodo[0], '').trim();
  }

  // 4. Reconhecimento de Frequência Explícita (1x semana, diariamente, etc.)
  const regexAdverbios = /\b(diariamente|semanalmente|quinzenalmente|mensalmente|anualmente)\b/i;
  const matchAdv = texto.match(regexAdverbios);
  if (matchAdv) {
    ehRotina = true;
    const adv = matchAdv[1].toLowerCase();
    if (adv === 'diariamente') intervaloDias = 1;
    if (adv === 'semanalmente') intervaloDias = 7;
    if (adv === 'quinzenalmente') intervaloDias = 15;
    if (adv === 'mensalmente') intervaloDias = 30;
    if (adv === 'anualmente') intervaloDias = 365;
    texto = texto.replace(matchAdv[0], '').trim();
  }

  const regexACada =
    /\ba\s+cada\s+(\d+|um|uma|dois|duas|tr[êe]s|quatro|cinco|seis|sete|oito|nove|dez|quinze|vinte|trinta)\s+(dias?|semanas?|m[êe]ses?|anos?)\b/i;
  const matchACada = texto.match(regexACada);
  if (matchACada) {
    ehRotina = true;
    const qtdRaw = matchACada[1].toLowerCase();
    const unidade = matchACada[2].toLowerCase();
    const qtd = NUMEROS_EXTENSO[qtdRaw] || parseInt(qtdRaw, 10) || 1;

    if (unidade.startsWith('dia')) intervaloDias = qtd;
    else if (unidade.startsWith('semana')) intervaloDias = qtd * 7;
    else if (unidade.startsWith('m')) intervaloDias = qtd * 30;
    else if (unidade.startsWith('ano')) intervaloDias = qtd * 365;

    texto = texto.replace(matchACada[0], '').trim();
  }

  const regexVezPor =
    /\b(\d+|um|uma|dois|duas|tr[êe]s|quatro|cinco)\s*(?:x|vez(?:es)?)\s+(?:por|na|no|ao|à)\s+(dia|semana|m[êe]s|mes|ano)\b/i;
  const matchVezPor = texto.match(regexVezPor);
  if (matchVezPor) {
    ehRotina = true;
    const vezesRaw = matchVezPor[1].toLowerCase();
    const unidade = matchVezPor[2].toLowerCase();
    const vezes = NUMEROS_EXTENSO[vezesRaw] || parseInt(vezesRaw, 10) || 1;

    if (unidade === 'dia') intervaloDias = 1;
    else if (unidade === 'semana') intervaloDias = Math.max(1, Math.round(7 / vezes));
    else if (unidade === 'mês' || unidade === 'mes') intervaloDias = Math.max(1, Math.round(30 / vezes));
    else if (unidade === 'ano') intervaloDias = Math.max(1, Math.round(365 / vezes));

    texto = texto.replace(matchVezPor[0], '').trim();
  }

  // 5. Data única sem janela ("dia 15/10", "15/10")
  if (!ehRotina) {
    const regexDataBr = /(?:^|\s)(?:dia\s+)?(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?(?=\s|$)/i;
    const matchDataBr = texto.match(regexDataBr);
    if (matchDataBr) {
      const d = String(matchDataBr[1]).padStart(2, '0');
      const m = String(matchDataBr[2]).padStart(2, '0');
      const anoAtual = new Date().getFullYear();
      const anoStr = matchDataBr[3]
        ? (matchDataBr[3].length === 2 ? `20${matchDataBr[3]}` : matchDataBr[3])
        : String(anoAtual);

      proximaData = `${anoStr}-${m}-${d}`;
      texto = texto.replace(matchDataBr[0], '').trim();
      tipo = TIPOS_TAREFA.AGENDADO;
      if (contexto === 'geral') {
        contexto = 'agenda';
      }
    }
  }

  // 6. Configuração Final de Rotina vs Agenda vs Foco
  if (ehRotina) {
    tipo = TIPOS_TAREFA.CADENCIA;
    if (!dataInicio) {
      dataInicio = formatarDataISO(new Date());
    }
    proximaData = dataInicio;
    cadencia = {
      intervaloDias,
      dataInicio,
      dataLimite,
    };
  } else if (horario) {
    tipo = TIPOS_TAREFA.AGENDADO;
    if (contexto === 'geral') {
      contexto = 'agenda';
    }
  }

  // 7. Seleção de Ícone baseada estritamente em pastas (cascata bottom-up)
  const icone = resolverIconePorContexto(contexto, tipo);

  const tituloLimpo = texto.replace(/\s{2,}/g, ' ').replace(/^[-–—,]\s*/, '').trim();

  return {
    titulo: tituloLimpo,
    icone,
    contexto,
    tipo,
    horario,
    cadencia,
    proximaData,
    prioridade: PRIORIDADES.P2,
  };
}


### 📄 ARQUIVO: ./src/utils/tree.js
/**
 * Transforma uma lista plana de tarefas em uma árvore com contagem acumulada
 */
export function construirArvoreContextos(tarefas = []) {
  const raiz = {
    nome: 'Geral',
    caminhoCompleto: '',
    filhos: {},
    tarefas: [],
    totalTarefas: 0,
  };

  if (!Array.isArray(tarefas)) return raiz;

  tarefas.forEach((tarefa) => {
    if (!tarefa) return;
    const caminho = (tarefa.contexto || 'geral').toLowerCase().trim();
    const partes = caminho.split('/').filter(Boolean);

    let noAtual = raiz;
    let caminhoAcumulado = '';

    if (partes.length === 0) {
      raiz.tarefas.push(tarefa);
      return;
    }

    partes.forEach((parte, index) => {
      caminhoAcumulado = caminhoAcumulado ? `${caminhoAcumulado}/${parte}` : parte;

      if (!noAtual.filhos[parte]) {
        noAtual.filhos[parte] = {
          nome: parte,
          caminhoCompleto: caminhoAcumulado,
          filhos: {},
          tarefas: [],
          totalTarefas: 0,
        };
      }

      noAtual = noAtual.filhos[parte];

      if (index === partes.length - 1) {
        noAtual.tarefas.push(tarefa);
      }
    });
  });

  // Função recursiva para calcular totalTarefas acumulado (próprias + subpastas)
  function calcularTotais(no) {
    let soma = no.tarefas.length;
    for (const filho of Object.values(no.filhos)) {
      soma += calcularTotais(filho);
    }
    no.totalTarefas = soma;
    return soma;
  }

  calcularTotais(raiz);
  return raiz;
}


### 📄 ARQUIVO: ./src/views/ContextsView.jsx
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


### 📄 ARQUIVO: ./src/views/GlobalQueueView.jsx
import React, { useState } from 'react';
import { CaretUp, CaretDown, Check, Lightning, ArrowCounterClockwise, CheckCircle, Trash } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA, PRIORIDADES } from '../types';
import { THEME } from '../colors';

function ItemFila({
  item,
  index,
  total,
  subAba,
  alternarPrioridade,
  moverParaCima,
  moverParaBaixo,
  toggleConcluir,
  getBadgePrioridade,
}) {
  const isPrincipal = index === 0;
  const isRadar = subAba === 'foco' && (index === 1 || index === 2);

  const estiloCard =
    subAba === 'foco'
      ? isPrincipal
        ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
        : 'bg-white border-zinc-200 hover:border-emerald-200 shadow-sm'
      : isPrincipal
      ? 'bg-purple-50/70 border-purple-300 shadow-sm'
      : 'bg-white border-zinc-200 hover:border-purple-200 shadow-sm';

  const corIcone =
    subAba === 'foco'
      ? isPrincipal
        ? 'text-emerald-700'
        : 'text-zinc-600'
      : isPrincipal
      ? 'text-purple-700'
      : 'text-zinc-600';

  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${estiloCard}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
        <div className="flex items-center justify-center w-5 font-mono text-xs shrink-0">
          {isPrincipal ? (
            <Lightning
              size={15}
              weight="fill"
              className={subAba === 'foco' ? THEME.foco.raio : 'text-purple-600'}
            />
          ) : (
            <span className="text-zinc-400 font-bold">{index + 1}</span>
          )}
        </div>

        <DynamicIcon name={item.icone} size={18} className={`shrink-0 ${corIcone}`} />

        <div className="flex-1 min-w-0">
          <p
            className={`text-xs truncate ${
              isPrincipal ? 'font-bold text-zinc-900' : 'font-medium text-zinc-800'
            }`}
          >
            {item.titulo}
          </p>
          {isRadar && (
            <span className="text-[10px] text-emerald-700 font-medium block">
              Radar Hoje ({index + 1}º)
            </span>
          )}
          {subAba === 'rotina' && item.cadencia?.intervaloDias && (
            <span className="text-[10px] text-purple-700 font-medium block">
              A cada {item.cadencia.intervaloDias} dias
              {item.horario ? ` • @${item.horario}` : ''}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => alternarPrioridade(item.id)}
          className={`px-1.5 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider transition-colors ${getBadgePrioridade(
            item.prioridade,
            item.tipo
          )}`}
          title="Alternar prioridade"
        >
          {item.prioridade.toUpperCase()}
        </button>

        <div className="flex flex-col gap-0.5 border-l border-zinc-200 pl-2">
          <button
            onClick={() => moverParaCima(item.id)}
            disabled={index === 0}
            className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 transition-colors"
            title="Mover para cima"
          >
            <CaretUp size={12} weight="bold" />
          </button>
          <button
            onClick={() => moverParaBaixo(item.id)}
            disabled={index === total - 1}
            className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 transition-colors"
            title="Mover para baixo"
          >
            <CaretDown size={12} weight="bold" />
          </button>
        </div>

        <button
          onClick={() => toggleConcluir(item.id)}
          className={`p-1.5 ml-1 rounded-lg border border-transparent transition-colors ${
            subAba === 'foco'
              ? 'text-zinc-400 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200'
              : 'text-zinc-400 hover:text-purple-700 hover:bg-purple-50 hover:border-purple-200'
          }`}
          title="Concluir tarefa"
        >
          <Check size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}

function ItemConcluido({ item, toggleConcluir, removerTarefa }) {
  const formatarHora = (isoStr) => {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 shadow-sm transition-all">
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
        <CheckCircle size={18} weight="fill" className="text-zinc-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs truncate font-medium text-zinc-400 line-through">
            {item.titulo}
          </p>
          <span className="text-[10px] text-zinc-400 block font-mono">
            Concluída {formatarHora(item.concluidoEm) ? `às ${formatarHora(item.concluidoEm)}` : ''}
            {item.contexto ? ` • #${item.contexto}` : ''}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => toggleConcluir(item.id)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
          title="Desfazer conclusão"
        >
          <ArrowCounterClockwise size={14} weight="bold" />
        </button>

        <button
          onClick={() => removerTarefa(item.id)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Excluir permanentemente"
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
}

export default function GlobalQueueView({
  tarefas,
  toggleConcluir,
  moverParaCima,
  moverParaBaixo,
  alternarPrioridade,
  removerTarefa,
  limparConcluidos,
}) {
  const [subAba, setSubAba] = useState('foco'); // 'foco' | 'rotina' | 'concluido'

  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const filaRotina = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.CADENCIA && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const filaConcluido = tarefas
    .filter((t) => t.concluido)
    .sort((a, b) => new Date(b.concluidoEm || 0) - new Date(a.concluidoEm || 0));

  const getBadgePrioridade = (p, tipo) => {
    if (tipo === TIPOS_TAREFA.CADENCIA) {
      if (p === PRIORIDADES.P1) return THEME.rotina.p1;
      if (p === PRIORIDADES.P2) return THEME.rotina.p2;
      return THEME.rotina.p3;
    }
    if (p === PRIORIDADES.P1) return THEME.foco.p1;
    if (p === PRIORIDADES.P2) return THEME.foco.p2;
    return THEME.foco.p3;
  };

  return (
    <div className="h-full flex flex-col pb-24 lg:pb-6 overflow-hidden">
      {/* 1. SELETOR MOBILE (< lg) */}
      <div className="flex p-1 bg-zinc-100 rounded-lg border border-zinc-200 mb-3 shrink-0 lg:hidden">
        <button
          onClick={() => setSubAba('foco')}
          className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
            subAba === 'foco'
              ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200/80 font-bold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          Foco
        </button>
        <button
          onClick={() => setSubAba('rotina')}
          className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
            subAba === 'rotina'
              ? 'bg-white text-purple-800 shadow-sm border border-purple-200/80 font-bold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          Rotina
        </button>
        <button
          onClick={() => setSubAba('concluido')}
          className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
            subAba === 'concluido'
              ? 'bg-white text-zinc-900 shadow-sm border border-zinc-300 font-bold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          Concluído
        </button>
      </div>

      {/* 2. VISUALIZAÇÃO MOBILE */}
      <div className="flex-1 flex flex-col min-h-0 lg:hidden">
        <div className="flex items-center justify-between pb-1 mb-2 border-b border-zinc-200 shrink-0">
          <div>
            <h2
              className={`text-xs uppercase tracking-wider font-bold ${
                subAba === 'foco'
                  ? THEME.foco.titulo
                  : subAba === 'rotina'
                  ? THEME.rotina.titulo
                  : 'text-zinc-600'
              }`}
            >
              {subAba === 'foco' && 'Fila de Foco'}
              {subAba === 'rotina' && 'Fila de Rotina'}
              {subAba === 'concluido' && 'Tarefas Concluídas'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {subAba === 'concluido' && filaConcluido.length > 0 && (
              <button
                onClick={limparConcluidos}
                className="text-[11px] text-zinc-400 hover:text-rose-600 transition-colors flex items-center gap-1 font-medium"
                title="Limpar todas as concluídas"
              >
                <Trash size={12} />
                <span>Limpar</span>
              </button>
            )}
            <span className="text-xs font-mono font-medium text-zinc-500">
              {subAba === 'foco' && `${filaFoco.length} tarefas`}
              {subAba === 'rotina' && `${filaRotina.length} rituais`}
              {subAba === 'concluido' && `${filaConcluido.length} concluídas`}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-0.5">
          {subAba === 'foco' &&
            (filaFoco.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa na fila de foco.</div>
            ) : (
              filaFoco.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaFoco.length}
                  subAba="foco"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            ))}

          {subAba === 'rotina' &&
            (filaRotina.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma rotina pendente.</div>
            ) : (
              filaRotina.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaRotina.length}
                  subAba="rotina"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            ))}

          {subAba === 'concluido' &&
            (filaConcluido.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa concluída ainda.</div>
            ) : (
              filaConcluido.map((item) => (
                <ItemConcluido
                  key={item.id}
                  item={item}
                  toggleConcluir={toggleConcluir}
                  removerTarefa={removerTarefa}
                />
              ))
            ))}
        </div>
      </div>

      {/* 3. VISUALIZAÇÃO DESKTOP: 3 Colunas (Foco | Rotina | Concluído) */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:h-full lg:min-h-0">
        {/* Coluna 1: Fila de Foco */}
        <div className="flex flex-col h-full min-h-0 border-r border-zinc-200 pr-4">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 shrink-0">
            <div>
              <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.foco.titulo}`}>
                Fila de Foco
              </h2>
              <p className="text-[11px] text-zinc-500">
                Os 3 primeiros alimentam a tela Hoje
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-emerald-800">
              {filaFoco.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {filaFoco.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa na fila de foco.</div>
            ) : (
              filaFoco.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaFoco.length}
                  subAba="foco"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            )}
          </div>
        </div>

        {/* Coluna 2: Fila de Rotina */}
        <div className="flex flex-col h-full min-h-0 border-r border-zinc-200 pr-4">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 shrink-0">
            <div>
              <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.rotina.titulo}`}>
                Fila de Rotina
              </h2>
              <p className="text-[11px] text-zinc-500">
                Precedência dos rituais
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-purple-800">
              {filaRotina.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {filaRotina.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma rotina cadastrada.</div>
            ) : (
              filaRotina.map((item, index) => (
                <ItemFila
                  key={item.id}
                  item={item}
                  index={index}
                  total={filaRotina.length}
                  subAba="rotina"
                  alternarPrioridade={alternarPrioridade}
                  moverParaCima={moverParaCima}
                  moverParaBaixo={moverParaBaixo}
                  toggleConcluir={toggleConcluir}
                  getBadgePrioridade={getBadgePrioridade}
                />
              ))
            )}
          </div>
        </div>

        {/* Coluna 3: Concluído (com Limpeza Geral e Exclusão Individual) */}
        <div className="flex flex-col h-full min-h-0">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 shrink-0">
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-600">
                Concluído
              </h2>
              <p className="text-[11px] text-zinc-500">
                Histórico em ordem de finalização
              </p>
            </div>

            <div className="flex items-center gap-2">
              {filaConcluido.length > 0 && (
                <button
                  onClick={limparConcluidos}
                  className="text-[11px] text-zinc-400 hover:text-rose-600 transition-colors flex items-center gap-1 font-medium hover:underline"
                  title="Limpar todas as concluídas"
                >
                  <Trash size={12} />
                  <span>Limpar</span>
                </button>
              )}
              <span className="text-xs font-mono font-medium text-zinc-500">
                {filaConcluido.length}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
            {filaConcluido.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs">Nenhuma tarefa concluída.</div>
            ) : (
              filaConcluido.map((item) => (
                <ItemConcluido
                  key={item.id}
                  item={item}
                  toggleConcluir={toggleConcluir}
                  removerTarefa={removerTarefa}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


### 📄 ARQUIVO: ./src/views/ManualView.jsx
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


### 📄 ARQUIVO: ./src/views/NotesView.jsx
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
  tarefas = [],
}) {
  const [mensagemConversao, setMensagemConversao] = useState('');

  const verificarSeExiste = (linha) => {
    const limpa = linha.replace(/^[-*•\d.]\s*/, '').trim();
    if (!limpa) return false;

    const parsed = processarInputRapido(limpa);
    if (!parsed || !parsed.titulo) return false;

    return tarefas.some((t) => {
      const mesmoTitulo = (t.titulo || '').trim().toLowerCase() === parsed.titulo.trim().toLowerCase();
      const ctxT = (t.contexto || 'geral').trim().toLowerCase();
      const ctxP = (parsed.contexto || 'geral').trim().toLowerCase();
      return mesmoTitulo && ctxT === ctxP;
    });
  };

  const handleConverterLinha = (linha) => {
    if (verificarSeExiste(linha)) return;

    const limpa = linha.replace(/^[-*•\d.]\s*/, '').trim();
    if (!limpa) return;

    const parsed = processarInputRapido(limpa);
    if (!parsed || !parsed.titulo) return;

    onAdicionarTarefa(parsed);
    setMensagemConversao(`Tarefa "${parsed.titulo}" criada na fila.`);

    setTimeout(() => {
      setMensagemConversao('');
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
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all border shrink-0 ${ativa ? THEME.notas.abaAtiva : THEME.notas.abaInativa
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
              {linhasUteis.map((linha, idx) => {
                const limpa = linha.replace(/^[-*•\d.]\s*/, '').trim();
                const jaExiste = verificarSeExiste(linha);

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg border transition-colors group shrink-0 ${
                      jaExiste
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : `${THEME.notas.cardLinhaBg} ${THEME.notas.cardLinhaBorder}`
                    }`}
                  >
                    <span className={`truncate flex-1 mr-2 text-xs font-medium ${
                      jaExiste ? 'text-emerald-950 font-semibold' : THEME.notas.cardLinhaTexto
                    }`}>
                      {limpa}
                    </span>
                    <button
                      onClick={() => !jaExiste && handleConverterLinha(linha)}
                      disabled={jaExiste}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border transition-colors shadow-sm shrink-0 ${
                        jaExiste
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 cursor-default font-mono uppercase tracking-wider'
                          : THEME.notas.converterBtn
                      }`}
                    >
                      {jaExiste ? (
                        <>
                          <CheckCircle size={12} weight="fill" className="text-emerald-600" />
                          Adicionada
                        </>
                      ) : (
                        <>
                          <ArrowElbowDownRight size={11} weight="bold" />
                          Criar Tarefa
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
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
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all border shrink-0 ${ativa ? THEME.notas.abaAtiva : THEME.notas.abaInativa
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
                const jaExiste = verificarSeExiste(linha);

                return (
                  <button
                    key={idx}
                    disabled={jaExiste}
                    onClick={() => !jaExiste && handleConverterLinha(linha)}
                    className={`w-full text-left p-3 rounded-xl border transition-all shadow-sm flex items-center justify-between group ${jaExiste
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 cursor-default'
                        : 'bg-white border-zinc-200 hover:border-amber-300 hover:bg-amber-50/40 text-zinc-800'
                      }`}
                    title={jaExiste ? 'Tarefa ativa no TaskFlow' : 'Clique para adicionar à sua fila de tarefas'}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-3">
                      {jaExiste ? (
                        <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0" />
                      ) : (
                        <Plus size={15} weight="bold" className="text-amber-600 shrink-0 group-hover:scale-110 transition-transform" />
                      )}
                      <span className="text-xs font-semibold truncate">
                        {limpa}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 transition-colors ${jaExiste
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300 group-hover:bg-amber-200'
                        }`}
                    >
                      {jaExiste ? 'Adicionada' : 'Criar Tarefa'}
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


### 📄 ARQUIVO: ./src/views/TodayView.jsx
import React, { useState, useEffect } from 'react';
import { Circle, CheckCircle, ArrowCounterClockwise } from '@phosphor-icons/react';
import DynamicIcon from '../components/DynamicIcon';
import { TIPOS_TAREFA } from '../types';
import { THEME } from '../colors';

const PESO_PRIORIDADE = {
  P1: 1,
  P2: 2,
  P3: 3,
};

export default function TodayView({ tarefas, toggleConcluir, pularParaDepois }) {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const formatarDataISO = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const hojeISO = formatarDataISO(agora);

  const converterParaMinutos = (horarioStr) => {
    if (!horarioStr) return null;
    const [horas, minutos] = horarioStr.split(':').map(Number);
    return horas * 60 + minutos;
  };

  const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();

  const calcularTempoRestante = (horarioStr) => {
    const minutosAlvo = converterParaMinutos(horarioStr);
    if (minutosAlvo === null) return '';

    const diffMin = minutosAlvo - minutosAtuais;
    if (diffMin <= 0) return 'Agora';

    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;

    if (h === 0) return `em ${m}m`;
    return `em ${h}h ${m > 0 ? `${m}m` : ''}`;
  };

  const rotinaPendenteOuAtrasada = (item) => {
    // Alerta de dia limite atingido
    if (item.cadencia?.dataLimite && item.cadencia.dataLimite <= hojeISO) return true;
    // Legado ou rotina vencida
    if (item.proximaData && item.proximaData < hojeISO) return true;
    return false;
  };

  // 1. Agenda: compromissos do dia (com horário ou com data marcada para hoje)
  const agendadosTarefas = tarefas
    .filter((t) => {
      if (t.tipo !== TIPOS_TAREFA.AGENDADO || t.concluido) return false;
      // Se tiver data específica, só exibe no dia correspondente (ou atrasados)
      if (t.proximaData && t.proximaData > hojeISO) return false;

      // Se tiver horário, esconde os que já passaram há muito tempo
      if (t.horario) {
        const minAlvo = converterParaMinutos(t.horario);
        return minAlvo !== null && minAlvo >= minutosAtuais;
      }
      // Se não tem horário, mas é data marcada para hoje (ou anterior), exibe o dia todo
      return true;
    })
    .sort((a, b) => {
      // Sem horário fica no topo do dia ou logo antes dos compromissos com hora
      if (!a.horario && b.horario) return -1;
      if (a.horario && !b.horario) return 1;
      return (a.horario || '').localeCompare(b.horario || '');
    });

  // 2. Rotina: ativadas a partir de dataInicio e ordenadas com dia limite no topo
  const rotinaTarefas = tarefas
    .filter((t) => {
      if (t.tipo !== TIPOS_TAREFA.CADENCIA || t.concluido) return false;
      const inicio = t.cadencia?.dataInicio || t.proximaData;
      if (!inicio) return true;
      return inicio <= hojeISO;
    })
    .sort((a, b) => {
      const pendenteA = rotinaPendenteOuAtrasada(a);
      const pendenteB = rotinaPendenteOuAtrasada(b);

      // 1. Apenas atrasadas e pendentes assumem os primeiros lugares
      if (pendenteA && !pendenteB) return -1;
      if (!pendenteA && pendenteB) return 1;

      // 2. Entre as pendentes, prioridade define a ordem (P1 > P2 > P3)
      if (pendenteA && pendenteB) {
        const pesoA = PESO_PRIORIDADE[a.prioridade] || 2;
        const pesoB = PESO_PRIORIDADE[b.prioridade] || 2;
        if (pesoA !== pesoB) {
          return pesoA - pesoB;
        }
        // Desempate por ordem de chegada na fila
        return (a.ordemFila || 0) - (b.ordemFila || 0);
      }

      // 3. As restantes (no prazo) permanecem como estavam
      return (a.ordemFila || 0) - (b.ordemFila || 0);
    });

  // 3. Foco: 1 principal + 2 no radar (total 3)
  const filaFoco = tarefas
    .filter((t) => t.tipo === TIPOS_TAREFA.FOCO && !t.concluido)
    .sort((a, b) => (a.ordemFila || 0) - (b.ordemFila || 0));

  const cardPrincipal = filaFoco[0] || null;
  const cardsRadar = filaFoco.slice(1, 3);

  return (
    <div className="h-full flex flex-col justify-between gap-2.5 overflow-hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
      {/* 1. BLOCO AGENDA */}
      <section className="flex flex-col shrink-0 lg:h-full lg:min-h-0 lg:flex-1">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.agendados.titulo}`}>
            Agenda
          </h2>
          <span className="text-[11px] font-mono text-zinc-400 lg:inline hidden">
            {agendadosTarefas.length} {agendadosTarefas.length === 1 ? 'compromisso' : 'compromissos'}
          </span>
        </div>

        {agendadosTarefas.length > 0 ? (
          <div className="h-[154px] lg:h-full lg:flex-1 overflow-y-auto space-y-2 no-scrollbar pr-0.5">
            {agendadosTarefas.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl border shadow-sm shrink-0 ${THEME.agendados.cardBg} ${THEME.agendados.cardBorder}`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <DynamicIcon name={item.icone || 'Clock'} size={18} className={`shrink-0 ${THEME.agendados.icone}`} />
                  <span className={`text-sm font-semibold truncate ${THEME.agendados.texto}`}>{item.titulo}</span>
                </div>
                <div className="flex items-center gap-2 text-xs shrink-0">
                  {item.horario ? (
                    <>
                      <span className={`font-mono font-bold ${THEME.agendados.horario}`}>{item.horario}</span>
                      <span className={THEME.agendados.tempoRestante}>({calcularTempoRestante(item.horario)})</span>
                    </>
                  ) : (
                    <span className={`font-mono font-semibold px-2 py-0.5 rounded text-[11px] ${THEME.agendados.cardBg} ${THEME.agendados.horario}`}>
                      Dia todo
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`h-[154px] lg:h-full lg:flex-1 flex items-center justify-center rounded-xl border border-dashed text-xs text-center shrink-0 ${THEME.agendados.cardBg} ${THEME.agendados.cardBorder} ${THEME.agendados.tempoRestante}`}>
            Nenhum compromisso agendado
          </div>
        )}
      </section>

      {/* 2. BLOCO ROTINA */}
      <section className="flex flex-col shrink-0 lg:h-full lg:min-h-0 lg:flex-1">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.rotina.titulo}`}>
            Rotina
          </h2>
          <span className="text-[11px] font-mono text-zinc-400 lg:inline hidden">
            {rotinaTarefas.length} {rotinaTarefas.length === 1 ? 'ritual' : 'rituais'}
          </span>
        </div>

        {rotinaTarefas.length > 0 ? (
          <div className="h-[154px] lg:h-full lg:flex-1 overflow-y-auto space-y-2 no-scrollbar pr-0.5">
            {rotinaTarefas.map((item) => {
              const pendente = rotinaPendenteOuAtrasada(item);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleConcluir(item.id)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl border cursor-pointer transition-colors shadow-sm shrink-0 ${THEME.rotina.cardBg} ${THEME.rotina.cardBorder}`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <button className={`transition-colors shrink-0 ${THEME.rotina.checkBtn}`}>
                      <Circle size={18} />
                    </button>
                    <DynamicIcon name={item.icone} size={18} className={`shrink-0 ${THEME.rotina.icone}`} />
                    <span className={`text-sm font-medium truncate ${THEME.rotina.texto}`}>{item.titulo}</span>
                  </div>
                  {pendente && (
                    <span className={`text-[11px] px-2 py-0.5 rounded border font-medium shrink-0 ${THEME.rotina.alertaAtrasado}`}>
                      Pendente
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`h-[154px] lg:h-full lg:flex-1 flex items-center justify-center rounded-xl border border-dashed text-xs text-center shrink-0 ${THEME.rotina.cardBg} ${THEME.rotina.cardBorder} text-purple-400`}>
            Nenhuma rotina pendente
          </div>
        )}
      </section>

      {/* 3. BLOCO FOCO */}
      <section className="flex-1 min-h-0 flex flex-col lg:h-full lg:flex-1 lg:justify-start lg:gap-3">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <h2 className={`text-xs uppercase tracking-wider font-bold ${THEME.foco.titulo}`}>
            Foco
          </h2>
          <span className="text-[11px] font-mono text-zinc-400 lg:inline hidden">
            {filaFoco.length} {filaFoco.length === 1 ? 'tarefa' : 'tarefas'}
          </span>
        </div>

        {/* Card Principal de Foco */}
        {cardPrincipal ? (
          <div className={`px-3.5 py-2.5 rounded-xl border shadow-sm flex flex-col shrink-0 ${THEME.foco.principalBg} ${THEME.foco.principalBorder}`}>
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-sm text-emerald-800 shrink-0">
                1.
              </span>
              <DynamicIcon
                name={cardPrincipal.icone}
                size={18}
                weight="bold"
                className={`shrink-0 ${THEME.foco.principalIcone}`}
              />
              <h3 className={`text-sm font-bold leading-normal truncate flex-1 min-w-0 ${THEME.foco.principalTexto}`}>
                {cardPrincipal.titulo}
              </h3>
            </div>

            <div className={`flex items-center justify-between pt-2 mt-2 border-t ${THEME.foco.principalDivisor}`}>
              <button
                onClick={() => pularParaDepois(cardPrincipal.id)}
                className={`flex items-center gap-1.5 text-xs transition-colors font-medium ${THEME.foco.pularBtn}`}
                title="Mover para o fim da fila de foco"
              >
                <ArrowCounterClockwise size={14} />
                Pular para depois
              </button>

              <button
                onClick={() => toggleConcluir(cardPrincipal.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${THEME.foco.concluirBtn}`}
              >
                <CheckCircle size={15} weight="bold" />
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-3 rounded-xl border border-dashed flex items-center justify-center text-center text-xs ${THEME.foco.vazioBg}`}>
            Nenhuma tarefa na fila de foco para hoje.
          </div>
        )}

        {/* Cards no Radar */}
        {cardsRadar.length > 0 && (
          <div className="shrink-0 flex flex-col lg:flex-1 lg:min-h-0">
            <span className={`text-[11px] font-semibold uppercase tracking-wide my-1.5 shrink-0 ${THEME.foco.radarTitulo}`}>
              A seguir no radar ({cardsRadar.length})
            </span>
            <div className="space-y-2">
              {cardsRadar.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border shadow-sm shrink-0 ${THEME.foco.radarBg} ${THEME.foco.radarBorder}`}
                >
                  <span className={`font-mono font-bold text-xs shrink-0 ${THEME.foco.radarNumero}`}>
                    {index + 2}.
                  </span>
                  <DynamicIcon name={item.icone} size={18} className={`shrink-0 ${THEME.foco.radarIcone}`} />
                  <span className={`truncate text-sm font-medium ${THEME.foco.radarTexto}`}>
                    {item.titulo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}


### 📄 ARQUIVO: ./TASKFLOW_MASTER.md
# 🧠 TASKFLOW_MASTER.md
**Documentação Conceitual e Operacional para IAs - TaskFlow**

---

## 1. Visão Geral da Plataforma
O **TaskFlow** é um Progressive Web App (PWA) de gerenciamento de tarefas minimalista focado em alta velocidade de captura e organização pessoal.
- **Proposta Central:** Eliminar formulários complexos e cadastros manuais extensos.
- **Entrada de Dados:** Toda a interação principal parte de um campo único de entrada rápida (`QuickInput`), onde o usuário digita comandos em linguagem natural.
- **Processamento:** O sistema interpreta o texto em linguagem natural para identificar e categorizar tarefas, extraindo parâmetros como horários, datas, frequências de repetição e pastas/contextos.

---

## 2. Ambiente de Desenvolvimento
- **Ambiente Operacional:** Windows.
- **Terminal Padrão:** Git Bash integrado ao VSCode.
- **Diretriz para IAs:** Todos os comandos de terminal sugeridos devem ser estritamente compatíveis com a sintaxe do Git Bash / Bash no ambiente Windows.

---

## 3. Infraestrutura e Serviços Externos (Invisíveis no Código Local)
Esta seção documenta as dependências que residem fora do repositório local e que o código-fonte por si só não explica completamente:

### A. Backend as a Service (Supabase)
- **Instância:** Projeto configurado no cliente via `@supabase/supabase-js`.
- **Tabela Principal:** `public.tarefas`
  - Campos: `id` (PK, string), `titulo` (string), `icone` (string), `contexto` (string), `tipo` (string), `horario` (string/null), `cadencia` (jsonb/null), `proximaData` (string/null), `prioridade` (string), `ordemFila` (integer), `concluido` (boolean), `concluidoEm` (string/null).
- **Canal Realtime:** Canal WebSocket ativo sob o nome `tarefas-realtime`, escutando eventos de `INSERT`, `UPDATE` e `DELETE` na tabela `tarefas` para manter múltiplos clientes sincronizados em tempo real.
- **Estratégia Offline-First:** O app salva localmente as tarefas em cache (`localStorage: taskflow_tarefas_v1`). Em caso de banco remoto vazio ou falha temporária de rede, o sistema realiza auto-recuperação através de um `upsert` em lote dos dados locais para a nuvem.

### B. Integração Google Calendar
- **Comunicação:** Requisição HTTP direta a um endpoint customizado hospedado no **Google Apps Script**.
- **Comportamento:** O script externo consulta a agenda do usuário e retorna os eventos do dia. No TaskFlow, esses itens são incorporados com o prefixo `gcal-` em seus identificadores.

### C. Módulo de Notas
- **Persistência Exclusiva Local:** O bloco de anotações opera de forma isolada, persistindo seus registros estritamente no dispositivo (`localStorage: taskflow_notas_v1`). Esses dados não trafegam nem são gravados no banco de dados do Supabase.

---

## 4. Protocolo de Inicialização para IAs (Geração do Dumper)
**Ação Obrigatória:** Ao iniciar uma nova conversa técnica, a IA deve primeiro orientar o usuário a executar o comando abaixo no Git Bash. Este script varre a estrutura do projeto e consolida a árvore de arquivos e o código-fonte atualizado no arquivo `TASKFLOW_DUMPER.md`.

```bash
OUTPUT="TASKFLOW_DUMPER.md"
echo "Gerando Snapshot Técnico do TaskFlow..."
echo "# 🖨️ TASKFLOW_DUMPER.md" > "$OUTPUT"
echo "Snapshot técnico gerado automaticamente com a estrutura e código da plataforma." >> "$OUTPUT"
echo -e "\n## 1. ÁRVORE DE DIRETÓRIOS" >> "$OUTPUT"
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/dev-dist/*" -not -path "*/build/*" -not -name "$OUTPUT" | sort >> "$OUTPUT"
echo -e "\n## 2. CÓDIGO FONTE INTEGRAL" >> "$OUTPUT"
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/dev-dist/*" -not -path "*/build/*" -not -name "$OUTPUT" -not -name "*.png" -not -name "*.jpg" -not -name "*.svg" -not -name "*.ico" -not -name "package-lock.json" | sort | while read -r file; do
  echo -e "\n\n### 📄 ARQUIVO: $file" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
done
echo "Concluído! Arquivo $OUTPUT pronto para leitura."
```

*Instrução para a IA:* Somente após o usuário rodar o comando e disponibilizar o conteúdo do `TASKFLOW_DUMPER.md`, inicie as análises e edições solicitadas.

---

## 5. Protocolo de Autoatualização (Encerramento da Sessão)
**Ação Obrigatória:** Antes de dar como finalizado qualquer atendimento que altere a arquitetura, estrutura ou escopo da plataforma, a IA deve:
1. Avaliar se as alterações realizadas modificaram integrações externas (Supabase, Google Calendar, etc.), dependências estruturais ou fluxos de trabalho descritos neste documento.
2. Caso identifique divergências, fornecer explicitamente ao usuário a versão revisada e atualizada do `TASKFLOW_MASTER.md`.
3. Instruir o usuário a gerar uma nova versão do `TASKFLOW_DUMPER.md` caso arquivos tenham sido criados, movidos ou excluídos.


### 📄 ARQUIVO: ./vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // Eleva o limite para 6 MB
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'TaskFlow',
        short_name: 'TaskFlow',
        description: 'Gestão de tarefas minimalista e de alta velocidade',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#09090b',
        background_color: '#09090b',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});