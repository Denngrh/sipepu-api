const LaporanModel = require("../models/LaporanModel");

class LaporanController {
  // Get all laporan with filters and pagination
  static async getAllLaporan(req, res) {
    try {
      const { status, prioritas, anonim, page = 1, limit = 10 } = req.query;

      const filters = {};
      if (status) filters.status = parseInt(status);
      if (prioritas) filters.prioritas = parseInt(prioritas);
      if (anonim !== undefined) filters.anonim = parseInt(anonim);

      const result = await LaporanModel.getAll(filters, page, limit);

      res.status(200).json({
        success: true,
        message: "Data laporan berhasil diambil",
        ...result,
      });
    } catch (error) {
      console.error("Error getting laporan:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data laporan",
        error: error.message,
      });
    }
  }

  // Get laporan by ID
  static async getLaporanById(req, res) {
    try {
      const { id } = req.params;
      const laporan = await LaporanModel.getById(id);

      if (!laporan) {
        return res.status(404).json({
          success: false,
          message: "Laporan tidak ditemukan",
        });
      }

      res.status(200).json({
        success: true,
        message: "Data laporan berhasil diambil",
        data: laporan,
      });
    } catch (error) {
      console.error("Error getting laporan by ID:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data laporan",
        error: error.message,
      });
    }
  }

  // Create new laporan
  static async createLaporan(req, res) {
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
      } = req.body;

      // Validasi field wajib
      if (!koordinat || !tempat || !deskripsi_laporan) {
        return res.status(400).json({
          success: false,
          message: "Koordinat, tempat, dan deskripsi laporan wajib diisi",
        });
      }

      // Tentukan apakah anonim berdasarkan kelengkapan data
      const isAnonim = !nama || !email || !no_hp || !no_ktp ? 0 : 1;

      const laporanData = {
        nama: isAnonim ? nama : null,
        email: isAnonim ? email : null,
        no_hp: isAnonim ? no_hp : null,
        no_ktp: isAnonim ? no_ktp : null,
        koordinat,
        tempat,
        deskripsi_laporan,
        prioritas: prioritas || null,
        validasi: validasi || null,
        anonim: anonim !== undefined ? anonim : isAnonim,
        status: 1, // Default: terkirim
      };

      const newLaporan = await LaporanModel.create(laporanData);

      res.status(201).json({
        success: true,
        message: "Laporan berhasil dibuat",
        data: newLaporan,
      });
    } catch (error) {
      console.error("Error creating laporan:", error);
      res.status(500).json({
        success: false,
        message: "Gagal membuat laporan",
        error: error.message,
      });
    }
  }

  // Update laporan
  static async updateLaporan(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Cek apakah laporan ada
      const existingLaporan = await LaporanModel.getById(id);
      if (!existingLaporan) {
        return res.status(404).json({
          success: false,
          message: "Laporan tidak ditemukan",
        });
      }

      const updated = await LaporanModel.update(id, updateData);

      if (updated) {
        const updatedLaporan = await LaporanModel.getById(id);
        res.status(200).json({
          success: true,
          message: "Laporan berhasil diupdate",
          data: updatedLaporan,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Gagal mengupdate laporan",
        });
      }
    } catch (error) {
      console.error("Error updating laporan:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengupdate laporan",
        error: error.message,
      });
    }
  }

  // Update status laporan
  static async updateStatusLaporan(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validasi status
      if (![1, 2, 3, 4].includes(parseInt(status))) {
        return res.status(400).json({
          success: false,
          message:
            "Status tidak valid. Status harus 1-4 (1: terkirim, 2: dilihat, 3: diproses, 4: selesai)",
        });
      }

      // Cek apakah laporan ada
      const existingLaporan = await LaporanModel.getById(id);
      if (!existingLaporan) {
        return res.status(404).json({
          success: false,
          message: "Laporan tidak ditemukan",
        });
      }

      const updated = await LaporanModel.updateStatus(id, status);

      if (updated) {
        const statusNames = {
          1: "Terkirim",
          2: "Dilihat",
          3: "Diproses",
          4: "Selesai",
        };

        res.status(200).json({
          success: true,
          message: `Status laporan berhasil diubah menjadi "${statusNames[status]}"`,
          data: { id, status, status_name: statusNames[status] },
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Gagal mengupdate status laporan",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengupdate status laporan",
        error: error.message,
      });
    }
  }

  // Delete laporan
  static async deleteLaporan(req, res) {
    try {
      const { id } = req.params;

      // Cek apakah laporan ada
      const existingLaporan = await LaporanModel.getById(id);
      if (!existingLaporan) {
        return res.status(404).json({
          success: false,
          message: "Laporan tidak ditemukan",
        });
      }

      const deleted = await LaporanModel.delete(id);

      if (deleted) {
        res.status(200).json({
          success: true,
          message: "Laporan berhasil dihapus",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Gagal menghapus laporan",
        });
      }
    } catch (error) {
      console.error("Error deleting laporan:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus laporan",
        error: error.message,
      });
    }
  }

  // Get statistics
  static async getStatistics(req, res) {
    try {
      const stats = await LaporanModel.getStatistics();

      res.status(200).json({
        success: true,
        message: "Statistik laporan berhasil diambil",
        data: stats,
      });
    } catch (error) {
      console.error("Error getting statistics:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil statistik laporan",
        error: error.message,
      });
    }
  }
}

module.exports = LaporanController;
