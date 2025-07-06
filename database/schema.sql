-- Database SIPEPU Schema

-- Create database
CREATE DATABASE IF NOT EXISTS sipepu;
USE sipepu;

-- Table untuk menyimpan laporan
CREATE TABLE laporan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    no_hp VARCHAR(20) NULL,
    no_ktp VARCHAR(20) NULL,
    koordinat VARCHAR(255) NOT NULL,
    tempat VARCHAR(255) NOT NULL,
    deskripsi_laporan TEXT NOT NULL,
    prioritas INT NULL COMMENT 'Skor prioritas 1-5 (NULL jika belum dinilai)',
    validasi INT NULL COMMENT 'Skor validasi 0-5 (NULL jika belum divalidasi)',
    anonim TINYINT(1) DEFAULT 0 COMMENT '1: lengkap, 0: anonim',
    status INT DEFAULT 1 COMMENT '1: terkirim, 2: dilihat, 3: diproses, 4: selesai',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index untuk performa
CREATE INDEX idx_status ON laporan(status);
CREATE INDEX idx_prioritas ON laporan(prioritas);
CREATE INDEX idx_created_at ON laporan(created_at);

-- Insert sample data
INSERT INTO laporan (nama, email, no_hp, no_ktp, koordinat, tempat, deskripsi_laporan, prioritas, validasi, anonim, status) VALUES
('John Doe', 'john@example.com', '081234567890', '1234567890123456', '-6.200000,106.816666', 'Jakarta Pusat', 'Jalan rusak parah di depan mall', NULL, NULL, 1, 1),
(NULL, NULL, NULL, NULL, '-6.175110,106.865036', 'Jakarta Timur', 'Lampu jalan mati sudah 3 hari', NULL, NULL, 0, 2),
('Jane Smith', 'jane@example.com', '087654321098', '9876543210987654', '-6.121435,106.774124', 'Jakarta Barat', 'Sampah menumpuk di area pasar', NULL, NULL, 1, 3);