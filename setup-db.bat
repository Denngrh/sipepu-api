@echo off
REM Setup Database SIPEPU untuk Windows
echo 🔧 Setting up SIPEPU Database...

REM Check if MySQL is accessible
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ❌ MySQL is not installed or not in PATH.
    echo    Please install MySQL and add it to your PATH environment variable.
    echo    Download from: https://dev.mysql.com/downloads/mysql/
    pause
    exit /b 1
)

echo 📊 Creating database and tables...

REM Load environment variables from .env file (simplified for Windows)
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DB_USER" set DB_USER=%%b
    if "%%a"=="DB_PASSWORD" set DB_PASSWORD=%%b
    if "%%a"=="DB_HOST" set DB_HOST=%%b
    if "%%a"=="DB_PORT" set DB_PORT=%%b
    if "%%a"=="DB_NAME" set DB_NAME=%%b
)

REM Set default values if not found in .env
if not defined DB_USER set DB_USER=root
if not defined DB_HOST set DB_HOST=localhost
if not defined DB_PORT set DB_PORT=3306
if not defined DB_NAME set DB_NAME=sipepu

REM Execute SQL schema
if defined DB_PASSWORD (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASSWORD% < database/schema.sql
) else (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% < database/schema.sql
)

if errorlevel 1 (
    echo ❌ Database setup failed!
    echo Please check your MySQL credentials and connection.
    pause
    exit /b 1
) else (
    echo ✅ Database setup completed successfully!
    echo 📋 Database: %DB_NAME%
    echo 📊 Table: laporan
    echo 🔗 Connection: %DB_HOST%:%DB_PORT%
    echo.
    echo 🚀 You can now start the server with:
    echo    npm install
    echo    npm start
    pause
)
