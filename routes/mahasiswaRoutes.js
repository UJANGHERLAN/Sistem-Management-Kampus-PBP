const express = require('express');
const Mahasiswa = require('../models/mahasiswa');
const router = express.Router();


// Endpoint untuk mendapatkan daftar mahasiswa
router.get('/all', async (req, res) => {
  try {
    const mahasiswaList = await Mahasiswa.findAll();
    res.status(200).json({ mahasiswaList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' }); // Ubah 'error' menjadi 'message'
  }
});


// Endpoint untuk membuat mahasiswa baru
router.post('/register', async (req, res) => {
  try {
    const newMahasiswa = await Mahasiswa.create(req.body);

    if (!newMahasiswa) {
      return res.status(500).json({ message: 'Gagal membuat mahasiswa baru.' });
    }

    res.status(201).json({ message: 'Mahasiswa berhasil terdaftar.', newMahasiswa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk mendapatkan detail mahasiswa berdasarkan ID
router.get('/:mahasiswa_id', async (req, res) => {
  try {
    const { mahasiswa_id } = req.params;
    const mahasiswa = await Mahasiswa.findById(mahasiswa_id);

    if (!mahasiswa) {
      return res.status(404).json({ error: 'Mahasiswa tidak ditemukan.' });
    }

    res.status(200).json({ mahasiswa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk mengedit data mahasiswa
router.put('/:mahasiswa_id', async (req, res) => {
  try {
    const { mahasiswa_id } = req.params;
    const updatedMahasiswa = await Mahasiswa.updateById(mahasiswa_id, req.body);

    if (!updatedMahasiswa) {
      return res.status(404).json({ error: 'Mahasiswa tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Data mahasiswa berhasil diperbarui.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk menghapus data mahasiswa
router.delete('/:mahasiswa_id', async (req, res) => {
  try {
    const { mahasiswa_id } = req.params;
    const result = await Mahasiswa.deleteById(mahasiswa_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mahasiswa tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Data mahasiswa berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

module.exports = router;

