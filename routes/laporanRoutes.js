const express = require("express");
const LaporanController = require("../controllers/LaporanController");

const router = express.Router();


router.get("/", LaporanController.getAllLaporan);
router.get("/statistics", LaporanController.getStatistics);
router.get("/:id", LaporanController.getLaporanById);
router.post("/", LaporanController.createLaporan);
router.put("/:id", LaporanController.updateLaporan);
router.patch("/:id/status", LaporanController.updateStatusLaporan);
router.delete("/:id", LaporanController.deleteLaporan);

module.exports = router;
