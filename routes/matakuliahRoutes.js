const express = require('express');
const MataKuliah = require('../models/matakuliah');
const router = express.Router();

// Endpoint untuk mendapatkan daftar mata kuliah
router.get('/', async (req, res) => {
  try {
    const mataKuliahList = await MataKuliah.findAll();
    res.status(200).json({ mataKuliahList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk menambahkan mata kuliah baru
router.post('/create', async (req, res) => {
  try {
    const newMataKuliah = await MataKuliah.create(req.body);

    if (!newMataKuliah) {
      return res.status(500).json({ message: 'Gagal menambahkan mata kuliah baru.' });
    }

    res.status(201).json({ message: 'Mata kuliah berhasil ditambahkan.', newMataKuliah });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk mendapatkan detail mata kuliah berdasarkan ID
router.get('/:mata_kuliah_id', async (req, res) => {
  try {
    const { mata_kuliah_id } = req.params;
    const mataKuliah = await MataKuliah.findByPk(mata_kuliah_id);

    if (!mataKuliah) {
      return res.status(404).json({ error: 'Mata kuliah tidak ditemukan.' });
    }

    res.status(200).json({ mataKuliah });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk mengedit data mata kuliah
router.put('/:mata_kuliah_id', async (req, res) => {
  try {
    const { mata_kuliah_id } = req.params;
    const updatedMataKuliah = await MataKuliah.updateById(mata_kuliah_id, req.body);

    if (!updatedMataKuliah) {
      return res.status(404).json({ error: 'Mata kuliah tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Data mata kuliah berhasil diperbarui.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk menghapus data mata kuliah
router.delete('/:mata_kuliah_id', async (req, res) => {
  try {
    const { mata_kuliah_id } = req.params;
    const result = await MataKuliah.deleteById(mata_kuliah_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mata kuliah tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Data mata kuliah berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

module.exports = router;
