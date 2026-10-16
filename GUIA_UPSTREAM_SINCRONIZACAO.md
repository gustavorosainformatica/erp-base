# 🚀 Guia de Sincronização Upstream (Base Template & Clientes)
**Autor:** Gustavo Rosa Informática  
**Padrão:** Git Upstream Workflow (White-Label Multi-Cliente)

Este documento explica como utilizar este repositório base (`erp-base`) para dar origem a projetos de novos clientes e como manter todos eles atualizados com correções e novas funcionalidades sem comprometer os dados de cada cliente.

---

## 1. Como publicar este Template no GitHub (Opção B)

1. Crie um novo repositório no seu GitHub com o nome: `erp-base` (público ou privado).
2. Marque a opção **"Template repository"** nas configurações do repositório no GitHub (*Settings > General > Template repository*).
3. No terminal da pasta `erp-base`:
   ```powershell
   cd d:\projetos-agy\erp-base
   git remote add origin https://github.com/gustavorosainformatica/erp-base.git
   git push -u origin main
   ```

---

## 2. Como criar um Novo Cliente a partir do Template

### Via GitHub (Mais fácil)
1. Vá até `https://github.com/gustavorosainformatica/erp-base`.
2. Clique no botão verde **"Use this template"** > **"Create a new repository"**.
3. Dê o nome da empresa (ex: `cliente-alfa-erp`).
4. Clone na sua máquina:
   ```powershell
   git clone https://github.com/gustavorosainformatica/cliente-alfa-erp.git d:\projetos-agy\cliente-alfa
   ```
5. Configure o `public/app-config.js` com o nome e logo do novo cliente.

### Via Pasta Local (Opção A)
1. Duplique a pasta `erp-base` para `d:\projetos-agy\NomeDoCliente`.
2. Remova a pasta `.git` da cópia: `Remove-Item -Recurse -Force .git`.
3. Inicie um novo repositório: `git init`, `git add .`, `git commit -m "feat: Início do projeto Cliente"`.

---

## 3. Como Vincular o Cliente ao Template (Upstream)

Na pasta de qualquer cliente (inclusive na Mis Sueños), vincule o repositório base:

```powershell
# Se usar o GitHub:
git remote add upstream https://github.com/gustavorosainformatica/erp-base.git

# Ou se preferir sincronizar localmente entre pastas no seu computador:
git remote add upstream d:\projetos-agy\erp-base
```

Para verificar se o vínculo foi feito:
```powershell
git remote -v
```
Você verá:
- `origin`: o repositório específico daquele cliente.
- `upstream`: o repositório base do template.

---

## 4. O Fluxo de Sincronização no Dia a Dia

### Quando você criar uma melhoria no Template Base:
1. Trabalhe na pasta `d:\projetos-agy\erp-base`.
2. Teste e envie as alterações:
   ```powershell
   git add .
   git commit -m "feat: Adicionado filtro avançado por período fiscal"
   git push origin main
   ```

### Para levar essa novidade para os clientes:
1. Abra a pasta do cliente que deseja atualizar (ex: `MisSuenos` ou `cliente-alfa`):
   ```powershell
   cd d:\projetos-agy\MisSuenos
   git pull upstream main --allow-unrelated-histories
   ```
2. O Git trará todos os novos recursos, telas e correções.
3. Seus dados de clientes (`clientes.db`, `.env`, `public/app-config.js`) **não serão alterados**, pois cada cliente tem sua própria configuração e base isoladas.
