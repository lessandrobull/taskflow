import { useState, useEffect } from 'react';

const STORAGE_KEY = 'taskflow_notas_v1';

const NOTA_PADRAO = [
  {
    id: 'nota-scratchpad',
    titulo: 'Scratchpad Geral',
    conteudo: 'Ideias soltas, comandos e rascunhos rápidos:\n\n- Comprar parafusos 6mm #casa/manutencao\n- Revisar endpoints de áudio do app\n- Checar status da entrega',
    atualizadoEm: new Date().toISOString(),
  },
];

export function useNotes() {
  const [notas, setNotas] = useState(() => {
    try {
      const salvas = localStorage.getItem(STORAGE_KEY);
      return salvas ? JSON.parse(salvas) : NOTA_PADRAO;
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
      titulo: 'Sem título',
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