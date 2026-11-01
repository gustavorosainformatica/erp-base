-- ============================================================
-- ESQUEMA COMPLETO DO BANCO DE DADOS - ERP GESTOR PRO (v2.0)
-- Compatível com SQLite Local e Turso Cloud (LibSQL)
-- Autor: Gustavo Rosa Informática
-- ============================================================

-- 1. Tabela de Clientes e Destinatários Fiscais
CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  apelido_referencia TEXT,
  razao_social TEXT,
  cpf TEXT,
  cpf_limpo TEXT,
  cnpj TEXT,
  cnpj_limpo TEXT,
  ie TEXT,
  telefone TEXT,
  telefone_limpo TEXT,
  endereco_completo TEXT,
  logradouro TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  uf TEXT,
  cep TEXT,
  cep_limpo TEXT,
  observacoes TEXT,
  arquivo_origem TEXT,
  data_cadastro TEXT
);

-- 2. Tabela de Catálogo de Produtos e Controle de Estoque
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo_sku TEXT UNIQUE,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  unidade_medida TEXT DEFAULT 'UN',
  preco_custo REAL DEFAULT 0,
  preco_venda REAL NOT NULL DEFAULT 0,
  estoque_atual REAL NOT NULL DEFAULT 0,
  estoque_minimo REAL DEFAULT 5,
  estoque_reservado REAL NOT NULL DEFAULT 0,
  ncm TEXT DEFAULT '',
  descricao TEXT,
  ativo INTEGER DEFAULT 1,
  data_cadastro TEXT NOT NULL,
  data_atualizacao TEXT
);

-- 3. Tabela de Gestão de Vendas, Encomendas e Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero TEXT NOT NULL UNIQUE,
  cliente_id INTEGER,
  cliente_nome TEXT NOT NULL,
  cidade TEXT,
  uf TEXT,
  telefone TEXT,
  itens TEXT NOT NULL,
  valor_total REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'AGUARDANDO_ENVIO',
  status_texto TEXT NOT NULL DEFAULT 'Aguardando Envio',
  codigo_rastreio TEXT,
  observacoes TEXT,
  data_pedido TEXT NOT NULL,
  data_atualizacao TEXT
);

-- 4. Tabela de Fornecedores Homologados
CREATE TABLE IF NOT EXISTS fornecedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  cnpj TEXT UNIQUE,
  ie TEXT,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  cidade TEXT,
  uf TEXT,
  cep TEXT,
  observacoes TEXT,
  ativo INTEGER DEFAULT 1,
  data_cadastro TEXT NOT NULL,
  data_atualizacao TEXT
);

-- 5. Tabela de Lançamentos Financeiros (Contas a Pagar / Receber / DRE)
CREATE TABLE IF NOT EXISTS financeiro_lancamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL,
  origem TEXT DEFAULT 'MANUAL',
  descricao TEXT NOT NULL,
  categoria TEXT DEFAULT 'Geral',
  cliente_id INTEGER,
  cliente_nome TEXT,
  fornecedor_id INTEGER,
  fornecedor_nome TEXT,
  pedido_id INTEGER,
  chave_nfe_origem TEXT,
  valor REAL NOT NULL DEFAULT 0,
  data_vencimento TEXT NOT NULL,
  data_pagamento TEXT,
  forma_pagamento TEXT DEFAULT 'PIX',
  status TEXT NOT NULL DEFAULT 'PENDENTE',
  comprovante_url TEXT,
  observacoes TEXT,
  data_cadastro TEXT NOT NULL,
  data_atualizacao TEXT
);

-- 6. Tabela de Importações e Notas Fiscais XML (Compras & Entradas)
CREATE TABLE IF NOT EXISTS compras_xml (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chave_nfe TEXT UNIQUE NOT NULL,
  numero_nfe TEXT,
  serie_nfe TEXT,
  fornecedor_id INTEGER,
  fornecedor_cnpj TEXT,
  fornecedor_nome TEXT,
  valor_total REAL DEFAULT 0,
  data_emissao TEXT,
  itens_json TEXT,
  xml_bruto TEXT,
  data_importacao TEXT NOT NULL
);

-- 7. Tabela de Configurações Dinâmicas do Sistema
CREATE TABLE IF NOT EXISTS configuracoes_sistema (
  chave TEXT PRIMARY KEY,
  valor TEXT NOT NULL,
  data_atualizacao TEXT NOT NULL
);

-- 8. Tabela de Usuários e Permissões (RBAC)
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  login TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  papel TEXT NOT NULL DEFAULT 'OPERADOR',
  permissoes TEXT DEFAULT '{}',
  cliente_id INTEGER,
  ativo INTEGER DEFAULT 1,
  ultimo_login TEXT,
  data_cadastro TEXT NOT NULL,
  data_atualizacao TEXT
);

-- 9. Tabela de Auditoria e Logs de Operações
CREATE TABLE IF NOT EXISTS logs_auditoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  cliente_nome TEXT,
  tipo_acao TEXT NOT NULL,
  campos_alterados TEXT,
  detalhes TEXT,
  ip_origem TEXT,
  user_agent TEXT,
  data_hora TEXT NOT NULL
);

-- 10. Tabela de Arquivos Anexos (GED / Documentos / Comprovantes)
CREATE TABLE IF NOT EXISTS arquivos_anexos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER,
  cliente_nome TEXT,
  tipo_documento TEXT NOT NULL,
  titulo TEXT,
  nome_arquivo TEXT NOT NULL,
  tamanho_bytes INTEGER,
  mimetype TEXT,
  storage_provedor TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  url TEXT NOT NULL,
  observacoes TEXT,
  data_upload TEXT NOT NULL
);

-- Índices de Alta Performance
CREATE INDEX IF NOT EXISTS idx_clientes_nome ON clientes (nome);
CREATE INDEX IF NOT EXISTS idx_clientes_uf ON clientes (uf);
CREATE INDEX IF NOT EXISTS idx_clientes_cidade ON clientes (cidade);
CREATE INDEX IF NOT EXISTS idx_clientes_cpf ON clientes (cpf_limpo);
CREATE INDEX IF NOT EXISTS idx_clientes_cnpj ON clientes (cnpj_limpo);
CREATE INDEX IF NOT EXISTS idx_clientes_cep ON clientes (cep_limpo);

CREATE INDEX IF NOT EXISTS idx_produtos_sku ON produtos (codigo_sku);
CREATE INDEX IF NOT EXISTS idx_produtos_nome ON produtos (nome);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos (categoria);

CREATE INDEX IF NOT EXISTS idx_pedidos_numero ON pedidos (numero);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente_id ON pedidos (cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos (status);

CREATE INDEX IF NOT EXISTS idx_fornecedores_cnpj ON fornecedores (cnpj);
CREATE INDEX IF NOT EXISTS idx_fornecedores_nome ON fornecedores (razao_social);

CREATE INDEX IF NOT EXISTS idx_fin_tipo ON financeiro_lancamentos (tipo);
CREATE INDEX IF NOT EXISTS idx_fin_status ON financeiro_lancamentos (status);
CREATE INDEX IF NOT EXISTS idx_fin_vencimento ON financeiro_lancamentos (data_vencimento);
CREATE INDEX IF NOT EXISTS idx_fin_pedido ON financeiro_lancamentos (pedido_id);

CREATE INDEX IF NOT EXISTS idx_compras_chave ON compras_xml (chave_nfe);

CREATE INDEX IF NOT EXISTS idx_usuarios_login ON usuarios (login);
CREATE INDEX IF NOT EXISTS idx_usuarios_papel ON usuarios (papel);

CREATE INDEX IF NOT EXISTS idx_logs_cliente ON logs_auditoria (cliente_id);
CREATE INDEX IF NOT EXISTS idx_logs_data ON logs_auditoria (data_hora);

CREATE INDEX IF NOT EXISTS idx_anexos_cliente ON arquivos_anexos (cliente_id);
CREATE INDEX IF NOT EXISTS idx_anexos_tipo ON arquivos_anexos (tipo_documento);
