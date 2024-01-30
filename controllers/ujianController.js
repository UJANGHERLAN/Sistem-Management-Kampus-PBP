const Ujian = require('../models/ujian');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Endpoint untuk mendaftarkan peserta ujian
function getDaftarPesertaUjian(req, res) {
  // Verifikasi token sebelum melanjutkan
  jwtMiddleware.verifyToken(req, res, () => {
    const ujianId = req.params.id;

    Ujian.getDaftarPesertaUjian(ujianId, (err, pesertaData) => {
      if (err) {
        console.error('Error retrieving peserta data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(pesertaData);
    });
  });
}
// Endpoint untuk mendapatkan data ujian berdasarkan ID
function getUjianById(req, res) {
  // Verifikasi token sebelum melanjutkan
  jwtMiddleware.verifyToken(req, res, () => {
    const ujianId = req.params.id;

    Ujian.getUjianById(ujianId, (err, ujianData) => {
      if (err) {
        console.error('Error retrieving ujian data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(ujianData);
    });
  });
}

// Endpoint untuk menambahkan ujian baru
function addUjian(req, res) {
  // Verifikasi token sebelum melanjutkan
  jwtMiddleware.verifyToken(req, res, () => {
    const { nama_ujian, mata_kuliah_id, mahasiswa_id, tanggal_ujian } = req.body;

    Ujian.addUjian(nama_ujian, mata_kuliah_id, mahasiswa_id, tanggal_ujian, (err, result) => {
      if (err) {
        console.error('Error adding ujian:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json({ message: 'Ujian added successfully', id: result.insertId });
    });
  });
}

// Endpoint untuk login peserta ujian
function loginPesertaUjian(req, res) {
  const { username, password } = req.body;

  // Lakukan verifikasi login peserta ujian di sini

  // Contoh sederhana, hanya mengecek apakah username dan password sesuai
  if (username === 'peserta1' && password === 'password123') {
    // Buat token dan kirimkan sebagai respons
    const token = jwtMiddleware.createToken(username);
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

// Endpoint untuk logout peserta ujian
function logoutPesertaUjian(req, res) {
  // Lakukan proses logout peserta ujian di sini

  res.json({ message: 'Logout successful' });
}

// Export semua fungsi endpoint untuk digunakan di server.js atau routes lainnya
module.exports = {
  getDaftarPesertaUjian,
  getUjianById,
  addUjian,
  loginPesertaUjian,
  logoutPesertaUjian,
};
