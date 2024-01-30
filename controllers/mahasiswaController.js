const Mahasiswa = require('../models/mahasiswa');

// Mendapatkan daftar mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswaList = await Mahasiswa.findAll();
    res.status(200).json({ mahasiswaList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendaftarkan mahasiswa baru
const createMahasiswa = async (req, res) => {
  const { nama, nim, jurusan, semester } = req.body;
  try {
    const newMahasiswa = await Mahasiswa.create({ nama, nim, jurusan, semester });
    res.status(201).json({ message: 'Mahasiswa berhasil terdaftar', newMahasiswa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan detail mahasiswa berdasarkan ID
const getMahasiswaById = async (req, res) => {
  const { mahasiswa_id } = req.params;
  try {
    const mahasiswa = await Mahasiswa.findByPk(mahasiswa_id);
    if (!mahasiswa) {
      res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
      return;
    }
    res.status(200).json({ mahasiswa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mengedit data mahasiswa
const updateMahasiswa = async (req, res) => {
  const { mahasiswa_id } = req.params;
  const { nama, semester } = req.body;
  try {
    const mahasiswa = await Mahasiswa.findByPk(mahasiswa_id);
    if (!mahasiswa) {
      res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
      return;
    }
    await mahasiswa.update({ nama, semester });
    res.status(200).json({ message: 'Data mahasiswa berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menghapus data mahasiswa
const deleteMahasiswa = async (req, res) => {
  const { mahasiswa_id } = req.params;
  try {
    const mahasiswa = await Mahasiswa.findByPk(mahasiswa_id);
    if (!mahasiswa) {
      res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
      return;
    }
    await mahasiswa.destroy();
    res.status(200).json({ message: 'Data mahasiswa berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllMahasiswa,
  createMahasiswa,
  getMahasiswaById,
  updateMahasiswa,
  deleteMahasiswa,
};