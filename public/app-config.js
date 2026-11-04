/**
 * CONFIGURAÇÃO DE IDENTIDADE VISUAL E WHITE-LABEL
 * ERP Gestor Pro (Template Base Multi-Ramo)
 * Autor: Gustavo Rosa Informática
 * 
 * Funcionalidade:
 * - Detecta automaticamente ambiente de testes (?env=dev, porta 3002 ou localhost) vs produção.
 * - Suporta troca rápida de identidade e customização visual completa.
 */

(function () {
  const isBrowser = typeof window !== 'undefined' && window.location;
  const port = isBrowser ? String(window.location.port || '') : '';
  const hostname = isBrowser ? String(window.location.hostname || '').toLowerCase() : '';
  const search = isBrowser ? String(window.location.search || '').toLowerCase() : '';

  const isDev = (
    port === '3002' ||
    search.includes('env=dev') ||
    hostname.includes('-dev') ||
    hostname.includes('homolog')
  );

  const configProd = {
    appName: "ERP Gestor Pro | Gestão Integrada de Clientes, Vendas & Fiscal",
    shortName: "ERP Gestor",
    tagline: "Gestão Integrada de Clientes & Fiscal",
    companyName: "Empresa Gestora LTDA",
    companyRazaoSocial: "EMPRESA GESTORA LTDA",
    userName: "Administrador",
    userRole: "Gestão & Administração",
    userInitials: "ADM",
    logoEmoji: "💼",
    stockModuleName: "Estoque & Produtos",
    breadcrumbName: "ERP Gestor Pro",
    companyAddress: "Av. Central, nº 100 - Centro",
    companyCityState: "SÃO PAULO - SP",
    companyCep: "01001-000",
    companyPhone: "(11) 99999-9999",
    dataNoticeTitle: "BASE DE CLIENTES & CRM",
    dataNoticeText: "Cadastre novos clientes ou utilize os filtros para gerenciar sua carteira de destinatários.",
    dataNoticeBadge: "🟢 SISTEMA ATIVO",
    isTemplateBase: true
  };

  const configDev = {
    ...configProd,
    appName: "ERP Gestor Pro [HOMOLOGAÇÃO] | Ambiente de Testes & Validação",
    shortName: "ERP Gestor [DEV]",
    tagline: "Ambiente de Homologação & Testes",
    dataNoticeBadge: "🟡 AMBIENTE DE HOMOLOGAÇÃO"
  };

  window.APP_CONFIG = isDev ? configDev : configProd;
})();
