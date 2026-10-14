import { TIPOS_TAREFA, PRIORIDADES } from '../types';

// Dicionário de ícones automáticos por palavras-chave
const MAPA_ICONES = [
    { palavras: ['pintar', 'tinta', 'parede', 'verniz', 'lixar'], icone: 'PaintBrush' },
    { palavras: ['telhado', 'telha', 'manta', 'obra', 'cimento', 'furadeira'], icone: 'Hammer' },
    { palavras: ['conserto', 'trocar', 'instalar', 'prateleira', 'chuveiro'], icone: 'Wrench' },
    { palavras: ['dentista', 'dente'], icone: 'Tooth' },
    { palavras: ['medico', 'consulta', 'remedio', 'saude', 'exame'], icone: 'Heartbeat' },
    { palavras: ['aula', 'aluno', 'ingles', 'mari', 'amanda', 'estefany'], icone: 'ChalkboardTeacher' },
    { palavras: ['quiz', 'quizhub', 'codigo', 'bug', 'app', 'hos', 'react', 'vite'], icone: 'Code' },
    { palavras: ['lixo', 'descarte'], icone: 'Trash' },
    { palavras: ['limpar', 'limpeza', 'pano', 'aspirador', 'lavar'], icone: 'Broom' },
    { palavras: ['comprar', 'mercado', 'loja', 'preco', 'pedir'], icone: 'ShoppingCart' },
    { palavras: ['treino', 'corrida', 'correr', 'academia', 'musculacao'], icone: 'PersonSimpleRun' },
    { palavras: ['estudo', 'ler', 'livro', 'resumo', 'filosofia'], icone: 'BookOpen' },
    { palavras: ['musica', 'gaita', 'blues', 'pedal', 'guitarra'], icone: 'MusicNote' },
];

export function processarInputRapido(textoBruto) {
    if (!textoBruto || !textoBruto.trim()) return null;

    let texto = textoBruto.trim();
    let horario = null;
    let contexto = 'geral';
    let tipo = TIPOS_TAREFA.FOCO;

    // 1. Detecta horário com @ (ex: @14:00 ou @14h)
    const regexHorario = /@(\d{1,2}(?::\d{2}|h\d{0,2}))/i;
    const matchHorario = texto.match(regexHorario);
    if (matchHorario) {
        let h = matchHorario[1].toLowerCase().replace('h', ':');
        if (!h.includes(':')) h = `${h}:00`;
        if (h.endsWith(':')) h = `${h}00`;
        horario = h;
        tipo = TIPOS_TAREFA.AGENDADO;
        texto = texto.replace(matchHorario[0], '').trim();
    }

    // 2. Detecta contexto hierárquico com # (suporta espaços até achar @ ou fim da linha)
    // Aceita #[casa/obras externas/pintura] ou #casa/obras externas/pintura
    const regexContexto = /#(?:\[([^\]]+)\]|([^\n@]+))/;
    const matchContexto = texto.match(regexContexto);
    if (matchContexto) {
        contexto = (matchContexto[1] || matchContexto[2]).trim().toLowerCase();
        texto = texto.replace(matchContexto[0], '').trim();
    }

    // 3. Título limpo (somente a ação)
    const tituloLimpo = texto.replace(/\s+/g, ' ').trim();

    // 4. Identificação do ícone por contexto ou palavras da ação
    let iconeEncontrado = 'Circle';
    const termoParaAnalise = `${tituloLimpo} ${contexto}`.toLowerCase();

    for (const regra of MAPA_ICONES) {
        if (regra.palavras.some((p) => termoParaAnalise.includes(p))) {
            iconeEncontrado = regra.icone;
            break;
        }
    }

    return {
        titulo: tituloLimpo,
        icone: iconeEncontrado,
        contexto: contexto,
        tipo: tipo,
        horario: horario,
        prioridade: PRIORIDADES.P2,
    };
}