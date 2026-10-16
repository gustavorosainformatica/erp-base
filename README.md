# 💼 ERP Gestor Pro - Template Base White-Label

> **Sistema de Gestão Integrada de Clientes, Vendas, Estoque e Central Fiscal**  
> Desenvolvido por: **Gustavo Rosa Informática**

Este repositório é o modelo base limpo (*template*) do ERP Gestor Pro. Ele foi desenvolvido para ser replicável para múltiplas empresas com isolamento total de dados e personalização rápida de marca (*White-Label*).

---

## 🌟 Principais Recursos

- 👥 **Módulo de Clientes & CRM**: Gestão com mapa interativo do Brasil por estado (UF), histórico de cadastros e busca instantânea (`Ctrl+K`).
- 🧾 **Central Fiscal**: Controle de NF-e (Modelo 55 SEFAZ) e NFS-e (Portal Nacional).
- 🪵 **Controle de Estoque & Produtos**: Cadastro de catálogo, controle de SKU, preços de custo/venda e níveis de estoque mínimo.
- 📦 **Vendas & Pedidos**: Gestão de pedidos e orçamentos.
- ☁️ **Banco Híbrido**: Opera com **SQLite Local** (modo offline imediato) e **Turso Cloud (LibSQL)** para sincronização na nuvem.
- 🎨 **White-Label Pronto**: Basta editar um único arquivo (`public/app-config.js`) para trocar nome, logo, temas e parâmetros de qualquer empresa.

---

## 🚀 Como Iniciar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicialize o banco de dados limpo (se necessário):
   ```bash
   npm run init:banco
   ```

3. Inicie o servidor local:
   ```bash
   npm run web
   ```
   Acesse no navegador: `http://localhost:3000`

---

## 🏢 Como Configurar para um Novo Cliente

Abra o arquivo `public/app-config.js` e personalize as propriedades da nova empresa:
```javascript
window.APP_CONFIG = {
  appName: "Nome da Empresa ERP",
  shortName: "Empresa",
  tagline: "Gestão Integrada",
  companyName: "Empresa Modelo LTDA",
  companyRazaoSocial: "EMPRESA MODELO LTDA",
  userName: "Seu Nome",
  userRole: "Gerente",
  userInitials: "EM",
  logoEmoji: "🚀",
  stockModuleName: "Estoque & Produtos",
  breadcrumbName: "Empresa ERP"
};
```

---

## 🔄 Sincronização entre Repositórios
Consulte o arquivo [`GUIA_UPSTREAM_SINCRONIZACAO.md`](file:///d:/projetos-agy/erp-base/GUIA_UPSTREAM_SINCRONIZACAO.md) para detalhes de como sincronizar este repositório base com os repositórios dos clientes.
