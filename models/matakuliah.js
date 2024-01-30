const { query } = require('../db');

class MataKuliah {
  static async findAll() {
    try {
      const results = await query('SELECT * FROM matakuliah');
      return results;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async create({ kode_matkul, nama_matkul, sks }) {
    try {
      const sql = 'INSERT INTO matakuliah (kode_matkul, nama_matkul, sks) VALUES (?, ?, ?)';
      const values = [kode_matkul, nama_matkul, sks];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async findByPk(mata_kuliah_id) {
    try {
      const sql = 'SELECT * FROM matakuliah WHERE mata_kuliah_id = ?';
      const values = [mata_kuliah_id];
      const results = await query(sql, values);

      if (results.length === 0) {
        return null;
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async updateById(mata_kuliah_id, { kode_matkul, nama_matkul, sks }) {
    try {
      const sql = 'UPDATE matakuliah SET kode_matkul = ?, nama_matkul = ?, sks = ? WHERE mata_kuliah_id = ?';
      const values = [kode_matkul, nama_matkul, sks, mata_kuliah_id];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async deleteById(mata_kuliah_id) {
    try {
      const sql = 'DELETE FROM matakuliah WHERE mata_kuliah_id = ?';
      const values = [mata_kuliah_id];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }
}

module.exports = MataKuliah;
