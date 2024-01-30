const express = require('express');
const router = express.Router();
const ujianController = require('../controllers/ujianController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Endpoint untuk mendaftarkan peserta ujian
router.get('/ujian/:id/daftar-peserta', jwtMiddleware.verifyToken, ujianController.getDaftarPesertaUjian);

// Endpoint untuk mendapatkan data ujian berdasarkan ID
router.get('/ujian/:id', jwtMiddleware.verifyToken, ujianController.getUjianById);

// Endpoint untuk menambahkan ujian baru
router.post('/ujian', jwtMiddleware.verifyToken, ujianController.addUjian);

// Endpoint untuk login peserta ujian
router.post('/ujian/login', ujianController.loginPesertaUjian);

// Endpoint untuk logout peserta ujian
router.post('/ujian/logout', jwtMiddleware.verifyToken, ujianController.logoutPesertaUjian);

module.exports = router;
