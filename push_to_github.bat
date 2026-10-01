@echo off
title Push Cyber Warriors Academy to GitHub (WHITEHUNTER)
echo ========================================================
echo Pushing Cyber Warriors Learning Academy to GitHub...
echo Target: https://github.com/WHITESSHUNTERTHAKUR/WHITEHUNTER.git
echo Branch: main
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Git Status...
git status --short

echo.
echo [2/3] Verifying Remote Origin...
git remote -v

echo.
echo [3/3] Pushing to GitHub (Sign in with your browser if prompted)...
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo SUCCESS: Project successfully pushed to GitHub!
    echo URL: https://github.com/WHITESSHUNTERTHAKUR/WHITEHUNTER
    echo ========================================================
) else (
    echo ========================================================
    echo Push encountered an error or was cancelled.
    echo If authentication was requested, please ensure you
    echo authorize via GitHub Browser sign-in or use a Personal Access Token.
    echo ========================================================
)

echo.
pause
