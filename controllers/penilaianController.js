const Penilaian = require('../models/penilaian');


// Mendapatkan daftar penilaian
const getAllPenilaian = async (req, res) => {
  try {
    const penilaianList = await Penilaian.findAll();
    res.status(200).json({ penilaianList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menambahkan data penilaian baru
const createPenilaian = async (req, res) => {
  const { mahasiswa_id, mata_kuliah_id, nilai } = req.body;
  try {
    const newPenilaian = await Penilaian.create({ mahasiswa_id, mata_kuliah_id, nilai });
    res.status(201).json({ message: 'Data penilaian berhasil ditambahkan', newPenilaian });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan detail penilaian berdasarkan ID
const getPenilaianById = async (req, res) => {
  const { penilaian_id } = req.params;
  try {
    const penilaian = await Penilaian.findByPk(penilaian_id);
    if (!penilaian) {
      res.status(404).json({ error: 'Data penilaian tidak ditemukan' });
      return;
    }
    res.status(200).json({ penilaian });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mengedit data penilaian
const updatePenilaian = async (req, res) => {
  const { penilaian_id } = req.params;
  const { nilai } = req.body;
  try {
    const penilaian = await Penilaian.findByPk(penilaian_id);
    if (!penilaian) {
      res.status(404).json({ error: 'Data penilaian tidak ditemukan' });
      return;
    }
    await penilaian.update({ nilai });
    res.status(200).json({ message: 'Data penilaian berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menghapus data penilaian
const deletePenilaian = async (req, res) => {
  const { penilaian_id } = req.params;
  try {
    const penilaian = await Penilaian.findByPk(penilaian_id);
    if (!penilaian) {
      res.status(404).json({ error: 'Data penilaian tidak ditemukan' });
      return;
    }
    await penilaian.destroy();
    res.status(200).json({ message: 'Data penilaian berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPenilaian,
  createPenilaian,
  getPenilaianById,
  updatePenilaian,
  deletePenilaian,
};