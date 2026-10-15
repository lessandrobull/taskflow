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
