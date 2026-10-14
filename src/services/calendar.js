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