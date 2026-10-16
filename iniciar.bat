@echo off
chcp 65001 >nul
title ERP Gestor Pro (Base) - Gustavo Rosa Informatica
cd /d "%~dp0"
set PORT=3001
echo ======================================================================
echo   INICIANDO ERP Gestor Pro (Base) (Porta 3001)
echo ======================================================================
echo [INFO] Abrindo navegador: http://localhost:3001
start http://localhost:3001
echo [INFO] Servidor rodando. Para encerrar, feche esta janela.
echo ======================================================================
node scripts/servidor_web.js
pause
