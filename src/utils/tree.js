/**
 * Transforma uma lista plana de tarefas em uma estrutura de árvore baseada em 'contexto'
 * Exemplo de contexto: "casa/obras externas/pintura"
 */
export function construirArvoreContextos(tarefas = []) {
  const raiz = {
    nome: 'Geral',
    caminhoCompleto: '',
    filhos: {},
    tarefas: [],
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
        };
      }

      noAtual = noAtual.filhos[parte];

      if (index === partes.length - 1) {
        noAtual.tarefas.push(tarefa);
      }
    });
  });

  return raiz;
}
