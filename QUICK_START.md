# SIPEPU API - Quick Reference

## 🚀 Quick Start

### 🐧 Linux/macOS

```bash
# 1. Clone & Install
git clone <repository-url>
cd sipepu-api
npm install

# 2. Setup Environment
cp .env.example .env
# Edit .env dengan kredensial MySQL Anda

# 3. Setup Database
chmod +x setup-db.sh
./setup-db.sh

# 4. Start Server
npm run dev
# Server running at: http://localhost:3000
```

### 🪟 Windows

**Option 1: Git Bash (Recommended)**

```bash
# Same as Linux/macOS commands above
git clone <repository-url>
cd sipepu-api
npm install
cp .env.example .env
chmod +x setup-db.sh
./setup-db.sh
npm run dev
```

**Option 2: Command Prompt/PowerShell**

```cmd
# 1. Clone & Install
git clone <repository-url>
cd sipepu-api
npm install

# 2. Setup Environment
copy .env.example .env
REM Edit .env dengan kredensial MySQL Anda

# 3. Setup Database
setup-db.bat

# 4. Start Server
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint                  | Description     |
| ------ | ------------------------- | --------------- |
| GET    | `/health`                 | Health check    |
| GET    | `/api/laporan`            | Get all laporan |
| GET    | `/api/laporan/:id`        | Get by ID       |
| POST   | `/api/laporan`            | Create laporan  |
| PUT    | `/api/laporan/:id`        | Update laporan  |
| PATCH  | `/api/laporan/:id/status` | Update status   |
| DELETE | `/api/laporan/:id`        | Delete laporan  |
| GET    | `/api/laporan/statistics` | Get statistics  |

## 🔧 Quick Examples

### Test Server

```bash
curl http://localhost:3000/health
```

### Get All Laporan

```bash
curl http://localhost:3000/api/laporan
```

### Create Laporan Anonim

```bash
curl -X POST http://localhost:3000/api/laporan \
  -H "Content-Type: application/json" \
  -d '{
    "koordinat": "-6.175110,106.865036",
    "tempat": "Lokasi test",
    "deskripsi_laporan": "Deskripsi laporan test",
    "anonim": 0
  }'
```

### Create Laporan Lengkap

```bash
curl -X POST http://localhost:3000/api/laporan \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "John Doe",
    "email": "john@example.com",
    "no_hp": "081234567890",
    "no_ktp": "1234567890123456",
    "koordinat": "-6.175110,106.865036",
    "tempat": "Lokasi test",
    "deskripsi_laporan": "Deskripsi laporan test",
    "anonim": 1
  }'
```

### Update Status

```bash
curl -X PATCH http://localhost:3000/api/laporan/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": 3}'
```

### Get Statistics

```bash
curl http://localhost:3000/api/laporan/statistics
```

## 🎯 Status Values

- `1` - Terkirim
- `2` - Dilihat
- `3` - Diproses
- `4` - Selesai

## 📝 Required Fields (POST)

- `koordinat` (string)
- `tempat` (string)
- `deskripsi_laporan` (string)

## 🔍 Filter Options (GET)

- `page` - Halaman (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (1-4)
- `anonim` - Filter by anonim (0 atau 1)

Example:

```bash
curl "http://localhost:3000/api/laporan?status=1&page=1&limit=5"
```
