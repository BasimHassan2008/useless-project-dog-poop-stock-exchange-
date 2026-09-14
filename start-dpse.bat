@echo off
cd /d "%~dp0"
set PATH=C:\Users\Abhi\nodejs\PFiles64\nodejs;%PATH%
echo ========================================================
echo   DOG POOP STOCK EXCHANGE (DPSE) - TRADING TERMINAL
echo   Global Canine Waste & Digestive Equities Platform
echo ========================================================
echo.
echo Starting multi-port server:
echo   - http://localhost:800
echo   - http://localhost:8000
echo   - http://localhost:8080
echo   - http://localhost:3000
echo.
echo Press Ctrl+C to stop.
echo.
node serve.js
pause
