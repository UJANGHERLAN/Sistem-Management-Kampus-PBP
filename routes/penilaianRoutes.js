const express = require('express');
const Penilaian = require('../models/penilaian');
const router = express.Router();

// Endpoint untuk mendapatkan daftar penilaian
router.get('/', async (req, res) => {
  try {
    const penilaianList = await Penilaian.findAll();
    res.status(200).json({ penilaianList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk menambahkan data penilaian baru
router.post('/', async (req, res) => {
  try {
    const newPenilaian = await Penilaian.create(req.body);

    if (!newPenilaian) {
      return res.status(500).json({ message: 'Gagal menambahkan data penilaian baru.' });
    }

    res.status(201).json({ message: 'Data penilaian berhasil ditambahkan.', newPenilaian });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk mendapatkan detail penilaian berdasarkan ID
router.get('/:penilaian_id', async (req, res) => {
  try {
    const { penilaian_id } = req.params;
    const penilaian = await Penilaian.findById(penilaian_id);

    if (!penilaian) {
      return res.status(404).json({ error: 'Data penilaian tidak ditemukan.' });
    }

    res.status(200).json({ penilaian });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk mengedit data penilaian
router.put('/:penilaian_id', async (req, res) => {
  try {
    const { penilaian_id } = req.params;
    const updatedPenilaian = await Penilaian.updateById(penilaian_id, req.body);

    if (!updatedPenilaian) {
      return res.status(404).json({ error: 'Data penilaian tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Data penilaian berhasil diperbarui.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

// Endpoint untuk menghapus data penilaian
router.delete('/:penilaian_id', async (req, res) => {
  try {
    const { penilaian_id } = req.params;
    const result = await Penilaian.deleteById(penilaian_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data penilaian tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Data penilaian berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
});

module.exports = router;
