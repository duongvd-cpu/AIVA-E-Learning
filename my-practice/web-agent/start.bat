@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Web Agent - Sconnect Learning Hub

echo ============================================
echo   SCONNECT - Web Agent Learning Hub
echo ============================================
echo.

REM 1) Tao venv neu chua co
if not exist "venv\Scripts\python.exe" (
    echo [1/3] Tao moi truong ao venv ...
    python -m venv venv
) else (
    echo [1/3] Da co venv.
)

REM 2) Kich hoat + cai thu vien
call "venv\Scripts\activate.bat"
echo [2/3] Cai / kiem tra thu vien ...
pip install -q -r requirements.txt

REM 3) Kiem tra .env co API key
if not exist ".env" (
    echo.
    echo [CANH BAO] Chua co file .env - can GEMINI_API_KEY.
    echo Hay tao .env tu .env.example va dien key roi chay lai.
    pause
    exit /b
)

echo [3/3] Khoi dong server ...
echo.
echo   ^>^>^>  Mo trinh duyet: http://localhost:8899
echo   (Giu cua so nay mo. Dong cua so = tat server)
echo.

REM Tu mo trinh duyet sau 4 giay (khong chan server)
start "" /b cmd /c "timeout /t 4 >nul & start "" http://localhost:8899"

python run.py
pause
