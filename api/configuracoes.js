/**
 * Vercel Serverless Function: /api/configuracoes
 * Motor White-Label de Dupla Camada (Ticket 6):
 * - Camada 1: Presets de Ramo (couros, informatica, comercio, oficina)
 * - Camada 2: Parametrização dinâmica pela Aba de Configurações Web
 */

import { query, run, registrarLog } from '../lib/db.js';

export const PRESETS_RAMO = {
  couros: {
    ramo_preset: 'couros',
    nome_fantasia: 'Empresa Gestora',
    subtitulo_sistema: 'Couros & Insumos • Sapiranga/RS',
    cor_primaria: '#c9a96e',
    label_pedidos: 'Pedidos & Vendas',
    label_produtos: 'Catálogo & Estoque',
    label_clientes: 'Carteira de Clientes',
    label_expedicao: 'Expedição & Rastreio',
    categorias_padrao: 'Bolsas & Mochilas,Carteiras & Acessórios,Couros & Peles,Ferragens,Fivelas & Metais,Insumos & Ferramentas,Selaria & Montaria',
    unidades_padrao: 'UN,PAR,M2,KG,KIT,RL'
  },
  informatica: {
    ramo_preset: 'informatica',
    nome_fantasia: 'Gustavo Informática',
    subtitulo_sistema: 'Assistência Técnica & TI • Gestão Comercial',
    cor_primaria: '#3b82f6',
    label_pedidos: 'Ordens de Serviço & Vendas',
    label_produtos: 'Peças & Serviços',
    label_clientes: 'Clientes & Empresas',
    label_expedicao: 'Bancada & Entrega',
    categorias_padrao: 'Hardware & Peças,Periféricos,Serviços de Manutenção,Redes & Infraestrutura,Licenças & Software,Cabos & Adaptadores',
    unidades_padrao: 'UN,SERV,HR,KIT,MT,CX'
  },
  comercio: {
    ramo_preset: 'comercio',
    nome_fantasia: 'ERP Comercial',
    subtitulo_sistema: 'Gestão de Vendas, Estoque & Faturamento',
    cor_primaria: '#10b981',
    label_pedidos: 'Vendas & Orçamentos',
    label_produtos: 'Produtos & Estoque',
    label_clientes: 'Clientes',
    label_expedicao: 'Separação & Entrega',
    categorias_padrao: 'Geral,Lançamentos,Promoções,Acessórios,Kits,Insumos',
    unidades_padrao: 'UN,CX,KG,LT,KIT,PAR'
  },
  oficina: {
    ramo_preset: 'oficina',
    nome_fantasia: 'ERP Oficina & Serviços',
    subtitulo_sistema: 'Controle de Ordens de Serviço, Peças & Caixa',
    cor_primaria: '#f59e0b',
    label_pedidos: 'Ordens de Serviço (OS)',
    label_produtos: 'Peças, Insumos & Mão de Obra',
    label_clientes: 'Clientes & Veículos/Equipamentos',
    label_expedicao: 'Pátio & Liberação',
    categorias_padrao: 'Peças de Reposição,Mão de Obra / Serviços,Fluidos & Lubrificantes,Elétrica,Acessórios,Revisão Preventiva',
    unidades_padrao: 'UN,SERV,LT,HR,KIT,PAR'
  },
  terraplanagem: {
    ramo_preset: 'terraplanagem',
    nome_fantasia: 'ERP Terraplanagem & Obras',
    subtitulo_sistema: 'Locação de Máquinas, Terraplanagem & Contratos de Obra',
    cor_primaria: '#eab308',
    label_pedidos: 'Ordens de Serviço & Medições',
    label_produtos: 'Máquinas, Equipamentos & Insumos',
    label_clientes: 'Clientes & Construtoras',
    label_expedicao: 'Obras & Operações',
    categorias_padrao: 'Escavação & Aterro,Locação de Máquinas,Transporte de Terra,Drenagem & Nivelamento,Combustível & Manutenção,Horas Máquina',
    unidades_padrao: 'HR,DIA,VIAG,M3,KM,UN'
  },
  moveis: {
    ramo_preset: 'moveis',
    nome_fantasia: 'ERP Móveis & Marcenaria',
    subtitulo_sistema: 'Gestão de Móveis Planejados, Decoração & Fábrica',
    cor_primaria: '#a16207',
    label_pedidos: 'Projetos & Pedidos de Venda',
    label_produtos: 'Móveis, Chapas & Ferragens',
    label_clientes: 'Clientes & Arquitetos',
    label_expedicao: 'Montagem & Entregas',
    categorias_padrao: 'Salas & Estar,Dormitórios,Cozinhas & Gourmet,Marcenaria & MDF,Ferragens & Puxadores,Decoração',
    unidades_padrao: 'UN,CJ,M2,KIT,PC'
  },
  artesanato: {
    ramo_preset: 'artesanato',
    nome_fantasia: 'ERP Artesanatos & Ateliê',
    subtitulo_sistema: 'Produção Artesanal, Peças Exclusivas & Encomendas',
    cor_primaria: '#ec4899',
    label_pedidos: 'Encomendas & Vendas',
    label_produtos: 'Peças Prontas & Matéria-Prima',
    label_clientes: 'Clientes & Lojistas',
    label_expedicao: 'Embalagem & Envios',
    categorias_padrao: 'Peças Decorativas,Utilitários,Lembrancinhas,Tecidos & Fios,Tintas & Vernizes,Embalagens',
    unidades_padrao: 'UN,KIT,PC,KG,MT'
  },
  roupas: {
    ramo_preset: 'roupas',
    nome_fantasia: 'ERP Moda & Confecção',
    subtitulo_sistema: 'Gestão de Vestuário, Grade de Cores/Tamanhos & Vendas',
    cor_primaria: '#8b5cf6',
    label_pedidos: 'Vendas & Condicionais',
    label_produtos: 'Roupas, Calçados & Acessórios',
    label_clientes: 'Clientes',
    label_expedicao: 'Expedição & Balcão',
    categorias_padrao: 'Feminino,Masculino,Infantil,Calçados,Acessórios,Moda Íntima,Coleção Atual',
    unidades_padrao: 'PC,PAR,CJ,KIT,UN'
  }
};

function responder(res, status, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.status(204).end();
    }
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  try {
    // GET: Retornar configurações atuais + lista de presets disponíveis
    if (req.method === 'GET') {
      const rows = await query('SELECT chave, valor FROM configuracoes_sistema');
      const config = {};
      for (const row of rows) {
        config[row.chave] = row.valor;
      }

      const padrao = PRESETS_RAMO[config.ramo_preset] || PRESETS_RAMO.couros;
      const configuracaoCompleta = { ...padrao, ...config };

      return responder(res, 200, {
        configuracoes: configuracaoCompleta,
        presets: PRESETS_RAMO
      });
    }

    // POST / PUT: Atualizar configurações ou aplicar um Preset de Ramo
    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await parseBody(req);

      if (body.acao === 'aplicar_preset' && body.ramo_preset) {
        const preset = PRESETS_RAMO[body.ramo_preset];
        if (!preset) {
          return responder(res, 400, { error: `Preset "${body.ramo_preset}" não encontrado.` });
        }

        const agora = new Date().toISOString();
        for (const [chave, valor] of Object.entries(preset)) {
          await run(
            `INSERT INTO configuracoes_sistema (chave, valor, data_atualizacao)
             VALUES (?, ?, ?)
             ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor, data_atualizacao = excluded.data_atualizacao`,
            [chave, String(valor), agora]
          );
        }

        await registrarLog({
          tipoAcao: 'CONFIG_PRESET_RAMO',
          camposAlterados: Object.keys(preset),
          detalhes: `Preset White-Label aplicado: ${body.ramo_preset.toUpperCase()}`,
          req
        });

        return responder(res, 200, {
          sucesso: true,
          mensagem: `Preset de ramo "${body.ramo_preset.toUpperCase()}" aplicado com sucesso!`,
          configuracoes: preset
        });
      }

      // Atualização customizada chave-valor (Camada 2 - Aba Configurações)
      const configuracoesRecebidas = body.configuracoes || body;
      const chavesIgnoradas = ['acao'];
      const atualizadas = {};

      const agora = new Date().toISOString();
      for (const [chave, valor] of Object.entries(configuracoesRecebidas)) {
        if (chavesIgnoradas.includes(chave) || typeof valor === 'object') continue;
        await run(
          `INSERT INTO configuracoes_sistema (chave, valor, data_atualizacao)
           VALUES (?, ?, ?)
           ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor, data_atualizacao = excluded.data_atualizacao`,
          [chave, String(valor ?? ''), agora]
        );
        atualizadas[chave] = String(valor ?? '');
      }

      await registrarLog({
        tipoAcao: 'CONFIG_SISTEMA_ATUALIZADA',
        camposAlterados: Object.keys(atualizadas),
        detalhes: `Configurações do sistema atualizadas (${Object.keys(atualizadas).length} chaves)`,
        req
      });

      return responder(res, 200, {
        sucesso: true,
        mensagem: 'Configurações do sistema salvas com sucesso!',
        atualizadas
      });
    }

    return responder(res, 405, { error: 'Método não permitido' });
  } catch (err) {
    console.error('[API Configuracoes Error]:', err);
    return responder(res, 500, { error: 'Erro interno na API de Configurações', details: err.message });
  }
}
