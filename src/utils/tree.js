/**
 * Transforma uma lista plana de tarefas em uma estrutura de árvore baseada em 'contexto'
 * Exemplo de contexto: "casa/obras externas/pintura"
 */
export function construirArvoreContextos(tarefas) {
  const raiz = {
    nome: 'Geral',
    caminhoCompleto: '',
    filhos: {},
    tarefas: [],
  };

  tarefas.forEach((tarefa) => {
    const caminho = tarefa.contexto || 'geral';
    const partes = caminho.split('/').filter(Boolean);

    let noAtual = raiz;
    let caminhoAcumulado = '';

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

      // Se for a última pasta do caminho, vincula a tarefa a ela
      if (index === partes.length - 1) {
        noAtual.tarefas.push(tarefa);
      }
    });
  });

  return raiz;
}