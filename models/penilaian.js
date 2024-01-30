const { query } = require('../db');

class Penilaian {
  static async findAll() {
    try {
      const results = await query('SELECT * FROM penilaian');
      return results;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async create({ mahasiswa_id, mata_kuliah_id, nilai }) {
    try {
      const sql = 'INSERT INTO penilaian (mahasiswa_id, mata_kuliah_id, nilai) VALUES (?, ?, ?)';
      const values = [mahasiswa_id, mata_kuliah_id, nilai];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async findById(penilaian_id) {
    try {
      const sql = 'SELECT * FROM penilaian WHERE penilaian_id = ?';
      const values = [penilaian_id];
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

  static async updateById(penilaian_id, { nilai }) {
    try {
      const sql = 'UPDATE penilaian SET nilai = ? WHERE penilaian_id = ?';
      const values = [nilai, penilaian_id];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async deleteById(penilaian_id) {
    try {
      const sql = 'DELETE FROM penilaian WHERE penilaian_id = ?';
      const values = [penilaian_id];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }
}

module.exports = Penilaian;
