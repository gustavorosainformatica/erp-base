-- ============================================================
-- ESQUEMA COMPLETO DO BANCO DE DADOS - ERP GESTOR PRO
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

-- 2. Tabela de Auditoria e Logs de Operações
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

-- 3. Tabela de Arquivos Anexos (GED / Comprovantes / Documentos)
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

-- 4. Tabela de Catálogo de Produtos e Controle de Estoque
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
  descricao TEXT,
  ativo INTEGER DEFAULT 1,
  is_teste INTEGER DEFAULT 0,
  data_cadastro TEXT NOT NULL,
  data_atualizacao TEXT
);

-- Índices de Alta Performance
CREATE INDEX IF NOT EXISTS idx_clientes_nome ON clientes (nome);
CREATE INDEX IF NOT EXISTS idx_clientes_uf ON clientes (uf);
CREATE INDEX IF NOT EXISTS idx_clientes_cidade ON clientes (cidade);
CREATE INDEX IF NOT EXISTS idx_logs_cliente ON logs_auditoria (cliente_id);
CREATE INDEX IF NOT EXISTS idx_logs_data ON logs_auditoria (data_hora);
CREATE INDEX IF NOT EXISTS idx_anexos_cliente ON arquivos_anexos (cliente_id);
CREATE INDEX IF NOT EXISTS idx_anexos_tipo ON arquivos_anexos (tipo_documento);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos (categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_sku ON produtos (codigo_sku);
CREATE INDEX IF NOT EXISTS idx_produtos_nome ON produtos (nome);
