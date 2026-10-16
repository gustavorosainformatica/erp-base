@echo off
chcp 65001 >nul
title ERP Gestor Pro (Base) - Gustavo Rosa Informatica
cd /d "%~dp0"
set PORT=3001
echo ======================================================================
echo   INICIANDO ERP Gestor Pro (Base) EM MODO APLICATIVO DESKTOP (Porta 3001)
echo ======================================================================

:: Abre em Modo Aplicativo Nativo (sem barra de navegacao e sem abas)
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo [INFO] Abrindo em Modo Aplicativo no Google Chrome...
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --app="http://localhost:3001"
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    echo [INFO] Abrindo em Modo Aplicativo no Microsoft Edge...
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --app="http://localhost:3001"
) else (
    echo [INFO] Abrindo no Navegador Padrao...
    start http://localhost:3001
)

echo [INFO] Servidor rodando. Para encerrar, feche esta janela.
echo ======================================================================
node scripts/servidor_web.js
pause
