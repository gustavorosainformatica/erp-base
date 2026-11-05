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
    shortName: "", // Produção: somente o logotipo ampliado, sem textos ao lado
    tagline: "", // Produção: sem subtítulo para ocupar espaço mínimo
    companyName: "Empresa Gestora LTDA",
    companyRazaoSocial: "EMPRESA GESTORA LTDA",
    userName: "Administrador",
    userRole: "Gestão & Administração",
    userInitials: "ADM",
    logoEmoji: "💼",
    logoImage: "logo.png",
    stockModuleName: "Estoque & Produtos",
    breadcrumbName: "ERP Gestor Pro",
    companyAddress: "Av. Central, nº 100 - Centro",
    companyCityState: "SÃO PAULO - SP",
    companyCep: "01001-000",
    companyPhone: "(11) 99999-9999",
    dataNoticeTitle: "BASE DE CLIENTES & CRM",
    dataNoticeText: "Cadastre novos clientes ou utilize os filtros para gerenciar sua carteira de destinatários.",
    dataNoticeBadge: "🟢 SISTEMA ATIVO",
    isTemplateBase: true,
    isDevEnvironment: false
  };

  const configDev = {
    ...configProd,
    appName: "ERP Gestor Pro [TESTES]",
    shortName: "TESTES", // Testes: somente o logotipo + badge TESTES ao lado
    tagline: "", // Testes: sem texto longo para ocupar espaço mínimo
    dataNoticeBadge: "🟡 AMBIENTE DE HOMOLOGAÇÃO",
    isDevEnvironment: true
  };

  window.APP_CONFIG = isDev ? configDev : configProd;
})();
