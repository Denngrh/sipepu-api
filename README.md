# SIPEPU API

Sistem Pelaporan SIPEPU - API untuk mengelola laporan masyarakat dengan fitur prioritas, validasi, dan status tracking.

## 🚀 Fitur

- ✅ CRUD Laporan (Create, Read, Update, Delete)
- 📊 Filter berdasarkan Status, Prioritas, dan Anonim
- 📄 Pagination
- 📈 Statistik Laporan
- 🔄 Update Status Laporan
- 🗄️ Koneksi MySQL dengan connection pooling
- 📋 Dokumentasi API dengan Postman Collection

## 📋 Struktur Database

### Tabel: `laporan`

| Field             | Type         | Description                                    |
| ----------------- | ------------ | ---------------------------------------------- |
| id                | INT (PK)     | ID unik laporan                                |
| nama              | VARCHAR(255) | Nama pelapor (nullable untuk anonim)           |
| email             | VARCHAR(255) | Email pelapor (nullable untuk anonim)          |
| no_hp             | VARCHAR(20)  | Nomor HP pelapor (nullable untuk anonim)       |
| no_ktp            | VARCHAR(20)  | Nomor KTP pelapor (nullable untuk anonim)      |
| koordinat         | VARCHAR(255) | Koordinat lokasi (wajib)                       |
| tempat            | VARCHAR(255) | Deskripsi tempat (wajib)                       |
| deskripsi_laporan | TEXT         | Deskripsi detail laporan (wajib)               |
| prioritas         | INT          | Skor prioritas 1-5 (NULL jika belum dinilai)   |
| validasi          | INT          | Skor validasi 0-5 (NULL jika belum divalidasi) |
| anonim            | TINYINT(1)   | 1: lengkap, 0: anonim (default: 0)             |
| status            | INT          | Status laporan (default: 1)                    |
| created_at        | TIMESTAMP    | Waktu dibuat                                   |
| updated_at        | TIMESTAMP    | Waktu diupdate                                 |

### Status Laporan:

- `1` - Terkirim
- `2` - Dilihat
- `3` - Diproses
- `4` - Selesai

## 🛠️ Panduan Instalasi Lengkap

### Prerequisite

**Semua Platform:**

- **Node.js** (v14 atau lebih baru) - [Download](https://nodejs.org/)
- **npm** (biasanya sudah include dengan Node.js)
- **MySQL Server** (v5.7 atau lebih baru) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)

**Windows Specific:**

- **Git Bash** (included dengan Git for Windows) - _Recommended untuk compatibility_
- **MySQL Command Line Tools** harus accessible dari PATH

**Linux Specific:**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm mysql-server git

# CentOS/RHEL
sudo yum install nodejs npm mysql-server git
```

**macOS Specific:**

```bash
# Menggunakan Homebrew
brew install node mysql git
```

### 📥 1. Clone Project

```bash
# Clone repository
git clone https://github.com/username/sipepu-api.git

# Masuk ke direktori project
cd sipepu-api

# Install dependencies
npm install
```

### ⚙️ 2. Konfigurasi Environment

Buat file `.env` di root project:

```bash
# Copy dari template
cp .env.example .env

# Edit file .env
nano .env
```

Isi file `.env` dengan konfigurasi database Anda:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=sipepu
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 🗄️ 3. Setup Database

#### Option A: Menggunakan Script Otomatis (Recommended)

**🐧 Linux/macOS:**

```bash
# Jalankan script setup database
chmod +x setup-db.sh
./setup-db.sh
```

**🪟 Windows:**

_Pilihan 1: Menggunakan Git Bash (Recommended)_

```bash
# Di Git Bash (sama seperti Linux)
chmod +x setup-db.sh
./setup-db.sh
```

_Pilihan 2: Menggunakan Command Prompt/PowerShell_

```cmd
# Di Command Prompt
mysql -u root -p < database/schema.sql
```

_Pilihan 3: Menggunakan MySQL Workbench_

1. Buka MySQL Workbench
2. Connect ke server MySQL
3. Open file `database/schema.sql`
4. Execute script

#### Option B: Setup Manual (Semua Platform)

```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE sipepu;
USE sipepu;

# Import schema
mysql -u root -p sipepu < database/schema.sql
```

### 🚀 4. Jalankan Server

```bash
# Development mode (auto-restart saat ada perubahan)
npm run dev

# atau Production mode
npm start
```

Server akan berjalan di: **http://localhost:3000**

### ✅ 5. Verifikasi Instalasi

Test apakah server berjalan dengan baik:

```bash
# Health check
curl http://localhost:3000/health

# Test get all laporan
curl http://localhost:3000/api/laporan
```

### 2. Setup Environment

Buat file `.env` atau edit yang sudah ada:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sipepu
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Setup Database

#### Option A: Menggunakan Script (Recommended)

```bash
chmod +x setup-db.sh
./setup-db.sh
```

#### Option B: Manual Setup

```bash
mysql -u root -p < database/schema.sql
```

### 4. Start Server

```bash
# Development mode dengan nodemon
npm run dev

# Production mode
npm start
```

Server akan berjalan di: http://localhost:3000

## 📡 API Endpoints Overview

### Base URL: `http://localhost:3000`

| Method | Endpoint                  | Description                                |
| ------ | ------------------------- | ------------------------------------------ |
| GET    | `/health`                 | Health check server                        |
| GET    | `/api/laporan`            | Get all laporan dengan filter & pagination |
| GET    | `/api/laporan/:id`        | Get laporan berdasarkan ID                 |
| POST   | `/api/laporan`            | Buat laporan baru                          |
| PUT    | `/api/laporan/:id`        | Update laporan lengkap                     |
| PATCH  | `/api/laporan/:id/status` | Update status laporan saja                 |
| DELETE | `/api/laporan/:id`        | Hapus laporan                              |
| GET    | `/api/laporan/statistics` | Get statistik laporan                      |

## 🔧 Cara Menggunakan API

### 1. Health Check

Test apakah server berjalan dengan baik:

```bash
curl http://localhost:3000/health
```

**Response:**

```json
{
  "success": true,
  "message": "SIPEPU API is running!",
  "timestamp": "2025-07-06T12:00:00.000Z",
  "version": "1.0.0"
}
```

### 2. GET - Mengambil Semua Laporan

#### Basic Request:

```bash
curl http://localhost:3000/api/laporan
```

#### Dengan Pagination:

```bash
curl "http://localhost:3000/api/laporan?page=1&limit=5"
```

#### Dengan Filter:

```bash
# Filter berdasarkan status
curl "http://localhost:3000/api/laporan?status=1"

# Filter berdasarkan anonim
curl "http://localhost:3000/api/laporan?anonim=0"

# Kombinasi filter
curl "http://localhost:3000/api/laporan?status=1&anonim=1&page=1&limit=10"
```

**Response Example:**

```json
{
  "success": true,
  "message": "Data laporan berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "John Doe",
      "email": "john@example.com",
      "no_hp": "081234567890",
      "no_ktp": "1234567890123456",
      "koordinat": "-6.200000,106.816666",
      "tempat": "Jakarta Pusat",
      "deskripsi_laporan": "Jalan rusak parah di depan mall",
      "prioritas": null,
      "validasi": null,
      "anonim": 1,
      "status": 1,
      "created_at": "2025-07-06T12:25:03.000Z",
      "updated_at": "2025-07-06T12:28:28.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 3,
    "itemsPerPage": 10
  }
}
```

### 3. GET - Mengambil Laporan Berdasarkan ID

```bash
curl http://localhost:3000/api/laporan/1
```

**Response:**

```json
{
  "success": true,
  "message": "Data laporan berhasil diambil",
  "data": {
    "id": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "koordinat": "-6.200000,106.816666",
    "tempat": "Jakarta Pusat",
    "deskripsi_laporan": "Jalan rusak parah di depan mall",
    "prioritas": null,
    "validasi": null,
    "anonim": 1,
    "status": 1
  }
}
```

### 4. POST - Membuat Laporan Baru

#### Laporan Lengkap (Dengan Data Pelapor):

```bash
curl -X POST http://localhost:3000/api/laporan \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Ahmad Budiman",
    "email": "ahmad@example.com",
    "no_hp": "081234567890",
    "no_ktp": "1234567890123456",
    "koordinat": "-6.200000,106.816666",
    "tempat": "Jl. Sudirman No. 123, Jakarta Pusat",
    "deskripsi_laporan": "Jalan berlubang besar di depan gedung perkantoran",
    "anonim": 1
  }'
```

#### Laporan Anonim (Tanpa Data Pelapor):

```bash
curl -X POST http://localhost:3000/api/laporan \
  -H "Content-Type: application/json" \
  -d '{
    "koordinat": "-6.175110,106.865036",
    "tempat": "Pasar Tanah Abang, Jakarta Pusat",
    "deskripsi_laporan": "Lampu jalan mati sudah 5 hari. Berbahaya untuk pejalan kaki.",
    "anonim": 0
  }'
```

**Response Success:**

```json
{
  "success": true,
  "message": "Laporan berhasil dibuat",
  "data": {
    "id": 4,
    "nama": "Ahmad Budiman",
    "email": "ahmad@example.com",
    "koordinat": "-6.200000,106.816666",
    "tempat": "Jl. Sudirman No. 123, Jakarta Pusat",
    "deskripsi_laporan": "Jalan berlubang besar di depan gedung perkantoran",
    "prioritas": null,
    "validasi": null,
    "anonim": 1,
    "status": 1
  }
}
```

### 5. PUT - Update Laporan Lengkap

```bash
curl -X PUT http://localhost:3000/api/laporan/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "John Doe Updated",
    "email": "john.updated@example.com",
    "no_hp": "081234567890",
    "no_ktp": "1234567890123456",
    "koordinat": "-6.200000,106.816666",
    "tempat": "Jakarta Pusat (Updated)",
    "deskripsi_laporan": "Jalan rusak parah di depan mall - UPDATE: Lubang semakin besar",
    "prioritas": 5,
    "validasi": 4,
    "anonim": 1,
    "status": 2
  }'
```

### 6. PATCH - Update Status Laporan

```bash
curl -X PATCH http://localhost:3000/api/laporan/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": 3
  }'
```

**Status Options:**

- `1` - Terkirim
- `2` - Dilihat
- `3` - Diproses
- `4` - Selesai

**Response:**

```json
{
  "success": true,
  "message": "Status laporan berhasil diubah menjadi \"Diproses\"",
  "data": {
    "id": 1,
    "status": 3,
    "status_name": "Diproses"
  }
}
```

### 7. DELETE - Hapus Laporan

```bash
curl -X DELETE http://localhost:3000/api/laporan/1
```

**Response:**

```json
{
  "success": true,
  "message": "Laporan berhasil dihapus"
}
```

### 8. GET - Statistik Laporan

```bash
curl http://localhost:3000/api/laporan/statistics
```

**Response:**

```json
{
  "success": true,
  "message": "Statistik laporan berhasil diambil",
  "data": {
    "statusStats": [
      {
        "status": 1,
        "count": 4,
        "status_name": "Terkirim"
      },
      {
        "status": 2,
        "count": 1,
        "status_name": "Dilihat"
      }
    ],
    "prioritasStats": [
      {
        "prioritas_label": "Belum Dinilai",
        "prioritas": null,
        "count": 6
      }
    ],
    "totalStats": {
      "total_laporan": 7,
      "laporan_lengkap": 4,
      "laporan_anonim": 3,
      "sudah_ada_prioritas": 0,
      "belum_ada_prioritas": 7,
      "sudah_divalidasi": 0,
      "belum_divalidasi": 7
    }
  }
}
```

## 📱 Testing dengan Postman

### 1. Import Collection

1. Buka Postman
2. Click **Import**
3. Pilih file `postman/SIPEPU_API_Collection.json`
4. Collection akan ter-import otomatis

### 2. Setup Environment

1. Buat environment baru di Postman
2. Tambahkan variable:
   - `base_url` = `http://localhost:3000`

### 3. Test All Endpoints

Collection sudah include semua endpoint dengan contoh request yang siap pakai:

- ✅ Health Check
- 📋 Get All Laporan (dengan pagination & filter)
- 🔍 Get Laporan by ID
- ➕ Create Laporan (Lengkap & Anonim)
- ✏️ Update Laporan & Status
- 📊 Get Statistics
- 🗑️ Delete Laporan

## 🐛 Troubleshooting

### Problem: Database Connection Failed

**Error:**

```
❌ Database connection failed: Access denied for user 'root'@'localhost'
```

**Solution:**

1. Periksa kredensial database di file `.env`
2. Pastikan MySQL service berjalan:
   ```bash
   sudo systemctl status mysql
   sudo systemctl start mysql  # jika belum berjalan
   ```
3. Test koneksi manual:
   ```bash
   mysql -u root -p -h localhost
   ```

### Problem: Port Already in Use

**Error:**

```
Error: listen EADDRINUSE :::3000
```

**Solution:**

1. Ganti port di file `.env`:
   ```env
   PORT=3001
   ```
2. Atau kill process yang menggunakan port 3000:
   ```bash
   sudo lsof -t -i tcp:3000 | xargs kill -9
   ```

### Problem: npm install Failed

**Solution:**

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Delete node_modules dan install ulang:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Problem: Database Schema Not Found

**Error:**

```
Table 'sipepu.laporan' doesn't exist
```

**Solution:**

1. Jalankan ulang setup database:
   ```bash
   ./setup-db.sh
   ```
2. Atau manual import:
   ```bash
   mysql -u root -p sipepu < database/schema.sql
   ```

### Problem: Windows - MySQL Command Not Found

**Error:**

```
'mysql' is not recognized as an internal or external command
```

**Solution:**

1. **Add MySQL to PATH:**

   - Open Environment Variables (Search "Environment Variables" in Start Menu)
   - Edit System PATH variable
   - Add MySQL bin directory (usually `C:\Program Files\MySQL\MySQL Server 8.0\bin`)
   - Restart Command Prompt

2. **Alternative - Use full path:**

   ```cmd
   "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < database/schema.sql
   ```

3. **Use MySQL Workbench:**
   - Open MySQL Workbench
   - Connect to your MySQL server
   - Open and execute `database/schema.sql`

### Problem: Windows - Script Execution Error

**Error:**

```
./setup-db.sh: cannot execute binary file
```

**Solution:**

1. **Use Git Bash instead of Command Prompt**
2. **Or use the Windows batch file:**
   ```cmd
   setup-db.bat
   ```
3. **Or manual setup:**
   ```cmd
   mysql -u root -p < database/schema.sql
   ```

### Problem: Windows - Environment Variables Not Loading

**Error:**

```
Database connection failed with default values
```

**Solution:**

1. **Make sure .env file exists and has correct format:**

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=sipepu
   DB_PORT=3306
   ```

2. **Use Git Bash for better .env support**

3. **Or set environment variables manually in Windows:**
   ```cmd
   set DB_HOST=localhost
   set DB_USER=root
   set DB_PASSWORD=your_password
   npm start
   ```

## 🗂️ Struktur Project

```
sipepu-api/
├── 📁 config/
│   └── database.js          # Konfigurasi koneksi MySQL
├── 📁 controllers/
│   └── LaporanController.js  # Logic business laporan
├── 📁 database/
│   └── schema.sql           # Schema database & sample data
├── 📁 models/
│   └── LaporanModel.js      # Model untuk database operations
├── 📁 postman/
│   └── SIPEPU_API_Collection.json  # Postman collection
├── 📁 routes/
│   └── laporanRoutes.js     # Route definitions
├── 📄 .env                  # Environment variables (not in git)
├── 📄 .gitignore           # Git ignore rules
├── 📄 package.json         # Dependencies & scripts
├── 📄 server.js            # Main server file
├── 📄 setup-db.sh          # Database setup script
├── 📄 update-db-schema.sh  # Database update script
└── 📄 README.md           # Dokumentasi project
```

## 🔧 Development

### Available Scripts:

```bash
npm start        # Start production server
npm run dev      # Start development server with auto-restart
```

### Database Scripts:

```bash
./setup-db.sh           # Setup database pertama kali
./update-db-schema.sh   # Update schema yang sudah ada
```

### Dependencies:

#### Production Dependencies:

- **express** - Web framework
- **mysql2** - MySQL client with promise support
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables loader
- **body-parser** - Request body parsing middleware

#### Development Dependencies:

- **nodemon** - Auto-restart server during development

## ⚡ Quick Start Commands

```bash
# Clone dan setup project
git clone https://github.com/username/sipepu-api.git
cd sipepu-api
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan kredensial database Anda

# Setup database
chmod +x setup-db.sh
./setup-db.sh

# Start server
npm run dev

# Test API
curl http://localhost:3000/health
```

## 📊 API Response Format

### Success Response:

```json
{
  "success": true,
  "message": "Deskripsi sukses",
  "data": {
    /* data object atau array */
  },
  "pagination": {
    /* pagination info (optional) */
  }
}
```

### Error Response:

```json
{
  "success": false,
  "message": "Deskripsi error",
  "error": "Detail error message"
}
```

## 🔐 Data Validation

### Required Fields untuk POST /api/laporan:

- `koordinat` (string) - Wajib
- `tempat` (string) - Wajib
- `deskripsi_laporan` (string) - Wajib

### Optional Fields:

- `nama` (string) - Untuk laporan non-anonim
- `email` (string) - Untuk laporan non-anonim
- `no_hp` (string) - Untuk laporan non-anonim
- `no_ktp` (string) - Untuk laporan non-anonim
- `prioritas` (integer 1-5) - Default: null
- `validasi` (integer 0-5) - Default: null
- `anonim` (0 atau 1) - Default: 0
- `status` (1-4) - Default: 1

## 🌟 Best Practices

### 1. Laporan Anonim vs Lengkap:

- **Anonim (anonim: 0)**: Tidak perlu data pelapor (nama, email, no_hp, no_ktp)
- **Lengkap (anonim: 1)**: Perlu data pelapor lengkap

### 2. Status Workflow:

```
1. Terkirim → 2. Dilihat → 3. Diproses → 4. Selesai
```

### 3. Prioritas & Validasi:

- Default: `null` (belum dinilai)
- Bisa diupdate nanti oleh admin dengan nilai 1-5

### 4. Error Handling:

- Selalu check `success` field dalam response
- Handle error dengan proper HTTP status codes

## 📝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Developer Name** - [GitHub](https://github.com/username)

## 🙏 Acknowledgments

- Express.js team untuk framework yang awesome
- MySQL team untuk database yang reliable
- Node.js community untuk ecosystem yang luar biasa
