# Platform-Specific Setup Guide

## 🐧 Linux/macOS Setup

### Prerequisites

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm mysql-server git

# macOS (with Homebrew)
brew install node mysql git
```

### Setup Commands

```bash
git clone <repository-url>
cd sipepu-api
npm install
cp .env.example .env
# Edit .env file
chmod +x setup-db.sh
./setup-db.sh
npm run dev
```

## 🪟 Windows Setup

### Prerequisites

1. **Download & Install:**

   - [Node.js](https://nodejs.org/) (includes npm)
   - [MySQL](https://dev.mysql.com/downloads/mysql/)
   - [Git for Windows](https://git-scm.com/) (includes Git Bash)

2. **Add MySQL to PATH:**
   - Open "Environment Variables" from Start Menu
   - Edit System PATH
   - Add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
   - Restart Command Prompt

### Setup Options

#### Option 1: Git Bash (Recommended)

```bash
# Open Git Bash and run same commands as Linux
git clone <repository-url>
cd sipepu-api
npm install
cp .env.example .env
# Edit .env file
chmod +x setup-db.sh
./setup-db.sh
npm run dev
```

#### Option 2: Command Prompt/PowerShell

```cmd
git clone <repository-url>
cd sipepu-api
npm install
copy .env.example .env
REM Edit .env file with notepad or your preferred editor
setup-db.bat
npm run dev
```

#### Option 3: MySQL Workbench (GUI)

```cmd
git clone <repository-url>
cd sipepu-api
npm install
copy .env.example .env
REM Edit .env file
REM Then open MySQL Workbench and execute database/schema.sql
npm run dev
```

## 🔧 Common Issues & Solutions

### Windows: MySQL Command Not Found

**Solution:** Add MySQL to PATH or use full path:

```cmd
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < database/schema.sql
```

### Windows: Script Won't Run

**Solution:** Use Git Bash or the .bat file:

```cmd
setup-db.bat
```

### All Platforms: Database Connection Failed

**Solution:** Check .env file credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=sipepu
```

## ✅ Verification

Test if everything works:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/laporan
```

Success response should show:

```json
{ "success": true, "message": "SIPEPU API is running!" }
```
