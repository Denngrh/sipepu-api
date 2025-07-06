const { pool } = require("../config/database");

class LaporanModel {
  // Get all laporan dengan filter dan pagination - Simplified version
  static async getAll(filters = {}, page = 1, limit = 10) {
    try {
      // Even simpler query
      const [rows] = await pool.execute(
        "SELECT * FROM laporan ORDER BY created_at DESC LIMIT 10"
      );
      const [countResult] = await pool.execute(
        "SELECT COUNT(*) as total FROM laporan"
      );

      const total = countResult[0].total;

      return {
        data: rows,
        pagination: {
          currentPage: 1,
          totalPages: Math.ceil(total / 10),
          totalItems: total,
          itemsPerPage: 10,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Get laporan by ID
  static async getById(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM laporan WHERE id = ?", [
        id,
      ]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Create new laporan
  static async create(laporanData) {
    try {
      const {
        nama,
        email,
        no_hp,
        no_ktp,
        koordinat,
        tempat,
        deskripsi_laporan,
        prioritas = null,
        validasi = null,
        anonim = 0,
        status = 1,
      } = laporanData;

      const [result] = await pool.execute(
        `INSERT INTO laporan 
                (nama, email, no_hp, no_ktp, koordinat, tempat, deskripsi_laporan, prioritas, validasi, anonim, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nama,
          email,
          no_hp,
          no_ktp,
          koordinat,
          tempat,
          deskripsi_laporan,
          prioritas,
          validasi,
          anonim,
          status,
        ]
      );

      return { id: result.insertId, ...laporanData };
    } catch (error) {
      throw error;
    }
  }

  // Update laporan
  static async update(id, laporanData) {
    try {
      const {
        nama,
        email,
        no_hp,
        no_ktp,
        koordinat,
        tempat,
        deskripsi_laporan,
        prioritas,
        validasi,
        anonim,
        status,
      } = laporanData;

      const [result] = await pool.execute(
        `UPDATE laporan SET 
                nama = ?, email = ?, no_hp = ?, no_ktp = ?, koordinat = ?, 
                tempat = ?, deskripsi_laporan = ?, prioritas = ?, validasi = ?, 
                anonim = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?`,
        [
          nama,
          email,
          no_hp,
          no_ktp,
          koordinat,
          tempat,
          deskripsi_laporan,
          prioritas,
          validasi,
          anonim,
          status,
          id,
        ]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Update status laporan
  static async updateStatus(id, status) {
    try {
      const [result] = await pool.execute(
        "UPDATE laporan SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete laporan
  static async delete(id) {
    try {
      const [result] = await pool.execute("DELETE FROM laporan WHERE id = ?", [
        id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get laporan statistics
  static async getStatistics() {
    try {
      const [statusStats] = await pool.execute(`
                SELECT 
                    status,
                    COUNT(*) as count,
                    CASE 
                        WHEN status = 1 THEN 'Terkirim'
                        WHEN status = 2 THEN 'Dilihat'
                        WHEN status = 3 THEN 'Diproses'
                        WHEN status = 4 THEN 'Selesai'
                        ELSE 'Unknown'
                    END as status_name
                FROM laporan 
                GROUP BY status
                ORDER BY status
            `);

      const [prioritasStats] = await pool.execute(`
                SELECT 
                    CASE 
                        WHEN prioritas IS NULL THEN 'Belum Dinilai'
                        ELSE CAST(prioritas AS CHAR)
                    END as prioritas_label,
                    prioritas,
                    COUNT(*) as count
                FROM laporan 
                GROUP BY prioritas
                ORDER BY prioritas DESC
            `);

      const [totalStats] = await pool.execute(`
                SELECT 
                    COUNT(*) as total_laporan,
                    COUNT(CASE WHEN anonim = 1 THEN 1 END) as laporan_lengkap,
                    COUNT(CASE WHEN anonim = 0 THEN 1 END) as laporan_anonim,
                    COUNT(CASE WHEN prioritas IS NOT NULL THEN 1 END) as sudah_ada_prioritas,
                    COUNT(CASE WHEN prioritas IS NULL THEN 1 END) as belum_ada_prioritas,
                    COUNT(CASE WHEN validasi IS NOT NULL THEN 1 END) as sudah_divalidasi,
                    COUNT(CASE WHEN validasi IS NULL THEN 1 END) as belum_divalidasi,
                    AVG(prioritas) as avg_prioritas,
                    AVG(validasi) as avg_validasi
                FROM laporan
            `);

      return {
        statusStats,
        prioritasStats,
        totalStats: totalStats[0],
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LaporanModel;
