# 🧠 TASKFLOW_MASTER.md
**Documentação Conceitual e Operacional para IAs - TaskFlow**

---

## 1. Visão Geral da Plataforma
O **TaskFlow** é um Progressive Web App (PWA) de gerenciamento de tarefas minimalista focado em alta velocidade de captura e organização pessoal.
- **Proposta Central:** Eliminar formulários complexos e cadastros manuais extensos.
- **Entrada de Dados:** Toda a interação principal parte de um campo único de entrada rápida (`QuickInput`), onde o usuário digita comandos em linguagem natural.
- **Processamento:** O sistema interpreta o texto em linguagem natural para identificar e categorizar tarefas, extraindo parâmetros como horários, datas, frequências de repetição e pastas/contextos.

---

## 2. Ambiente de Desenvolvimento e Regras de Atendimento
- **Ambiente Operacional:** Windows.
- **Terminal Padrão:** Git Bash integrado ao VSCode.
- **Diretriz para IAs:** Todos os comandos de terminal sugeridos devem ser estritamente compatíveis com a sintaxe do Git Bash / Bash no ambiente Windows.
- **Proibição Estrita de Inferência:** É estritamente proibido inferir. Ao receber instruções, a IA precisa entender exatamente **como está** e **como tem que ser** antes de sugerir ou executar qualquer alteração.
- **Regra de Renderização do Arquivo Master:** Sempre que enviar o `TASKFLOW_MASTER.md` no chat, a IA DEVE envelopar o conteúdo usando delimitadores de 4 crases (````markdown ... ````) e enviar o arquivo 100% integral. Jamais truncar, omitir trechos ou permitir que blocos internos fechem o código antes do fim. O usuário deve conseguir copiar o arquivo completo com um único clique.

---

## 3. Infraestrutura e Serviços Externos (Invisíveis no Código Local)
Esta seção documenta as dependências que residem fora do repositório local e que o código-fonte por si só não explica completamente:

### A. Backend as a Service (Supabase)
- **Instância:** Projeto configurado no cliente via `@supabase/supabase-js`.
- **Autenticação & Sessão:** Controle de acesso exclusivo via Supabase Auth (`LoginView.jsx`), com persistência automática de sessão criptografada no `localStorage` do navegador para inicialização direta e transparente nos dispositivos autorizados.
- **Tabela Principal:** `public.tarefas` com Row Level Security (RLS) estritamente ativado e política de permissão restrita a conexões autenticadas (`auth.role() = 'authenticated'`). Bloqueio público contra requisições não autorizadas.
  - Campos: `id` (PK, string), `titulo` (string), `icone` (string), `contexto` (string), `tipo` (string), `horario` (string/null), `cadencia` (jsonb/null), `proximaData` (string/null), `prioridade` (string), `ordemFila` (integer), `concluido` (boolean), `concluidoEm` (string/null).
- **Canal Realtime:** Canal WebSocket ativo sob o nome `tarefas-realtime`, escutando eventos de `INSERT`, `UPDATE` e `DELETE` na tabela `tarefas` para manter múltiplos clientes sincronizados em tempo real.
- **Estratégia Offline-First:** O app salva localmente as tarefas em cache (`localStorage: taskflow_tarefas_v1`). Em caso de banco remoto vazio ou falha temporária de rede, o sistema realiza auto-recuperação através de um `upsert` em lote dos dados locais para a nuvem.

### B. Integração Google Calendar
- **Comunicação:** Requisição HTTP direta a um endpoint customizado hospedado no **Google Apps Script**.
- **Comportamento e Deduplicação:** O script externo consulta a agenda do usuário e retorna os eventos do dia. Para impedir colisões no Supabase (`ON CONFLICT`) causadas por eventos recorrentes ou múltiplos eventos sob o mesmo ID de série do Google Calendar, o TaskFlow gera identificadores determinísticos compostos no formato `gcal-${ev.id}-${horarioLimpo}` e deduplica o lote em memória via `Map` antes de persistir no banco ou no Virtual DOM.

### C. Módulo de Notas
- **Persistência Exclusiva Local:** O bloco de anotações opera de forma isolada, persistindo seus registros estritamente no dispositivo (`localStorage: taskflow_notas_v1`). Esses dados não trafegam nem são gravados no banco de dados do Supabase.

---

## 4. Protocolo de Inicialização para IAs (Geração do Dumper Seguro)
**Ação Obrigatória:** Ao iniciar uma nova conversa técnica, a IA deve primeiro orientar o usuário a executar o comando abaixo no Git Bash. Este script varre a estrutura do projeto com exclusão estrita de arquivos sensíveis, consolidando a árvore e o código em `TASKFLOW_DUMPER.md`.

```bash
OUTPUT="TASKFLOW_DUMPER.md"
echo "Gerando Snapshot Técnico Seguro do TaskFlow..."
echo "# 🖨️ TASKFLOW_DUMPER.md" > "$OUTPUT"
echo "Snapshot técnico gerado automaticamente com a estrutura e código da plataforma." >> "$OUTPUT"
echo -e "\n## 1. ÁRVORE DE DIRETÓRIOS" >> "$OUTPUT"
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/dev-dist/*" -not -path "*/build/*" -not -name "*.env*" -not -name ".env*" -not -name "backup*" -not -name "$OUTPUT" |sort >> "$OUTPUT"
echo -e "\n## 2. CÓDIGO FONTE INTEGRAL" >> "$OUTPUT"
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/dev-dist/*" -not -path "*/build/*" -not -name "*.env*" -not -name ".env*" -not -name "backup*" -not -name "$OUTPUT" -not -name "*.png" -not -name "*.jpg" -not -name "*.svg" -not -name "*.ico" -not -name "package-lock.json" | sort | while read -r file; do
  echo -e "\n\n### 📄 ARQUIVO: $file" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
done
echo "Concluído! Arquivo $OUTPUT pronto para leitura."
```

*Instrução para a IA:* Somente após o usuário rodar o comando e disponibilizar o conteúdo do `TASKFLOW_DUMPER.md`, inicie as análises e edições solicitadas.

---

## 5. Protocolo de Autoatualização (Encerramento da Sessão)
**Ação Obrigatória:** Antes de dar como finalizado qualquer atendimento que altere a arquitetura, estrutura ou escopo da plataforma, a IA deve:
1. Avaliar se as alterações realizadas modificaram integrações externas (Supabase, Google Calendar, etc), dependências estruturais ou fluxos de trabalho descritos neste documento.
2. Caso identifique divergências, fornecer explicitamente ao usuário a versão revisada e atualizada do `TASKFLOW_MASTER.md`.
3. **Formatação e Integridade Obrigatórias:** A entrega do `TASKFLOW_MASTER.md` deve ser feita na íntegra (arquivo completo, do início ao fim, sem resumos ou quebras), envelopada estritamente com blocos de 4 crases para que o bloco de código interno da Seção 4 não feche a janela de cópia prematuramente.
4. Instruir o usuário a gerar uma nova versão do `TASKFLOW_DUMPER.md` caso arquivos tenham sido criados, movidos ou excluídos.