@echo off
title CYBER WARRIORS LEARNING ACADEMY - Tactical Training Suite
color 0b

echo ======================================================================
echo    ______   ______  ______ _____  ____  _____   _____ 
echo   / ____/\ / ____/_/ ____// ___/ / __ \/ ___/  / ____/ 
echo  / /     // __/  / __/   / /__  / / / /\__ \  / /___   
echo / /___  // /___ / /___  / ___/ / /_/ /___/ / / /___    
echo \____/_//_____//_____/ /_/     \____//____/  \____/_/  
echo.
echo     CYBER WARRIORS LEARNING ACADEMY
echo     Training Suite for Cyber Security, Networking & Ethical Hacking
echo ======================================================================
echo.
echo [1/3] Initializing Tactical Local Engine...
cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [!] First-time setup: installing dependencies...
    call npm install
)

echo [2/3] Booting Tactical Local Server on port 5174...
start /b cmd /c "npx vite --port 5174 --host 127.0.0.1"

:: Wait 2 seconds for server to be ready
timeout /t 2 /nobreak >nul

echo [3/3] Launching CYBEROPS Native Desktop Window Mode...
echo.

:: Try opening in Microsoft Edge App Mode (Clean borderless desktop window)
set EDGE_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set EDGE_PATH_64="C:\Program Files\Microsoft\Edge\Application\msedge.exe"
set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
set CHROME_PATH_X86="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

if exist %EDGE_PATH_64% (
    start "" %EDGE_PATH_64% --app=http://127.0.0.1:5174 --window-size=1360,880
    goto RUNNING
)
if exist %EDGE_PATH% (
    start "" %EDGE_PATH% --app=http://127.0.0.1:5174 --window-size=1360,880
    goto RUNNING
)
if exist %CHROME_PATH% (
    start "" %CHROME_PATH% --app=http://127.0.0.1:5174 --window-size=1360,880
    goto RUNNING
)
if exist %CHROME_PATH_X86% (
    start "" %CHROME_PATH_X86% --app=http://127.0.0.1:5174 --window-size=1360,880
    goto RUNNING
)

:: Fallback to default browser
start "" "http://127.0.0.1:5174"

:RUNNING
echo [SUCCESS] CYBEROPS Defense Command is operational.
echo Press any key in this window to terminate the server.
echo.
pause >nul
