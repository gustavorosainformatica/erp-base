# Regras da Matriz Universal: `erp-base` (Nível 2)

Este diretório contém a **Matriz Template Universal (`erp-base`)** utilizada para provisionar novos sistemas ERP White-Label.

## Diretrizes Obrigatórias deste Projeto

1. **Neutralidade Absoluta (100% Agnóstico):**
   - É **TERMINANTEMENTE PROIBIDO** inserir nomes, logotipos, endereços, telefones, CPFs/CNPJs ou regras de negócio exclusivas de qualquer cliente específico (como *Mis Sueños*, *Terraplanagem* ou outros) neste repositório.
   - Todos os fallbacks de configuração em `public/app-config.js`, `public/index.html` e `scripts/servidor_web.js` devem utilizar exclusivamente dados neutros de demonstração (`EMPRESA DEMONSTRACAO LTDA`, `AV. CENTRAL, Nº 100`, CEP `01001-000`, `(11) 99999-0000`).

2. **Blindagem Zero-PII no Repositório:**
   - O arquivo `public/dados_clientes.js` deve conter apenas `window.CLIENTES_DATA = [];` e permanecer listado no `.gitignore`.
   - O banco local `database/clientes.db` é ignorado pelo Git e inicializado limpo via `scripts/init_banco_zerado.js`.

3. **Arquitetura Serverless Unificada (Limite Vercel Hobby):**
   - Para respeitar o teto estrito de **12 Serverless Functions** do plano gratuito da Vercel, todas as rotas da API REST (`/api/*`) devem ser centralizadas e despachadas através do único arquivo `api/index.js`, espelhadas em `scripts/servidor_web.js`.
