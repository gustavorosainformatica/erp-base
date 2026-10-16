#!/usr/bin/env node
/**
 * Script de Inicialização de Banco SQLite Zerado
 * Cria todas as tabelas e índices necessários sem nenhum cliente.
 * Autor: Gustavo Rosa Informática
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');
const DB_PATH = path.join(BASE_DIR, 'database', 'clientes.db');
const SCHEMA_PATH = path.join(BASE_DIR, 'database', 'schema.sql');

console.log('='.repeat(70));
console.log('🛠️  INICIALIZADOR DE BANCO DE DADOS LIMPO - ERP GESTOR PRO');
console.log('='.repeat(70));

const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf-8');

console.log(`\n📂 Criando banco em: ${DB_PATH}...`);
const db = new DatabaseSync(DB_PATH);

// Executa o schema
db.exec(schemaSql);
console.log('   ✔ Tabelas criadas: clientes, logs_auditoria, arquivos_anexos, produtos');
console.log('   ✔ Índices de alta performance criados.');

// Insere log inicial do sistema
const agora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
db.prepare(`
  INSERT INTO logs_auditoria (
    cliente_id, cliente_nome, tipo_acao, campos_alterados, detalhes, ip_origem, user_agent, data_hora
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  null,
  'Sistema',
  'INICIALIZACAO_BANCO',
  'schema',
  'Banco de dados SQLite inicializado limpo com sucesso.',
  '127.0.0.1',
  'CLI Antigravity / Node.js',
  agora
);

const countClientes = db.prepare('SELECT COUNT(*) as t FROM clientes').get();
const countProdutos = db.prepare('SELECT COUNT(*) as t FROM produtos').get();

console.log('\n📊 Estado do banco:');
console.log(`   - Clientes cadastrados: ${countClientes.t}`);
console.log(`   - Produtos cadastrados: ${countProdutos.t}`);
console.log('\n✅ Banco zerado pronto para uso!');
