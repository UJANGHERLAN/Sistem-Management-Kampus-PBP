const MataKuliah = require('../models/matakuliah');

// Mendapatkan daftar mata kuliah
const getAllMataKuliah = async (req, res) => {
  try {
    const mataKuliahList = await MataKuliah.findAll();
    res.status(200).json({ mataKuliahList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menambahkan mata kuliah baru
const createMataKuliah = async (req, res) => {
  const { kode_matkul, nama_matkul, sks } = req.body;
  try {
    const newMataKuliah = await MataKuliah.create({ kode_matkul, nama_matkul, sks });
    res.status(201).json({ message: 'Mata kuliah berhasil ditambahkan', newMataKuliah });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan detail mata kuliah berdasarkan ID
const getMataKuliahById = async (req, res) => {
  const { mata_kuliah_id } = req.params;
  try {
    const mataKuliah = await MataKuliah.findByPk(mata_kuliah_id);
    if (!mataKuliah) {
      res.status(404).json({ error: 'Mata kuliah tidak ditemukan' });
      return;
    }
    res.status(200).json({ mataKuliah });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mengedit data mata kuliah
const updateMataKuliah = async (req, res) => {
  const { mata_kuliah_id } = req.params;
  const { kode_matkul, nama_matkul, sks } = req.body;
  try {
    const mataKuliah = await MataKuliah.findByPk(mata_kuliah_id);
    if (!mataKuliah) {
      res.status(404).json({ error: 'Mata kuliah tidak ditemukan' });
      return;
    }
    await mataKuliah.update({ kode_matkul, nama_matkul, sks });
    res.status(200).json({ message: 'Data mata kuliah berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menghapus mata kuliah
const deleteMataKuliah = async (req, res) => {
  const { mata_kuliah_id } = req.params;
  try {
    const mataKuliah = await MataKuliah.findByPk(mata_kuliah_id);
    if (!mataKuliah) {
      res.status(404).json({ error: 'Mata kuliah tidak ditemukan' });
      return;
    }
    await mataKuliah.destroy();
    res.status(200).json({ message: 'Mata kuliah berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllMataKuliah,
  createMataKuliah,
  getMataKuliahById,
  updateMataKuliah,
  deleteMataKuliah,
};
