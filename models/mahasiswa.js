const { query } = require('../db');

class Mahasiswa {
  static async findAll() {
    try {
      const results = await query('SELECT * FROM mahasiswa');
      return results;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async create({ nama, nim, jurusan, semester }) {
    try {
      const sql = 'INSERT INTO mahasiswa (nama, nim, jurusan, semester) VALUES (?, ?, ?, ?)';
      const values = [nama, nim, jurusan, semester];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async findById(mahasiswaId) {
    try {
      const sql = 'SELECT * FROM mahasiswa WHERE mahasiswa_id = ?';
      const values = [mahasiswaId];
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

  static async updateById(mahasiswaId, { nama, semester }) {
    try {
      const sql = 'UPDATE mahasiswa SET nama = ?, semester = ? WHERE mahasiswa_id = ?';
      const values = [nama, semester, mahasiswaId];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }

  static async deleteById(mahasiswaId) {
    try {
      const sql = 'DELETE FROM mahasiswa WHERE mahasiswa_id = ?';
      const values = [mahasiswaId];
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Terjadi kesalahan server.');
    }
  }
}

module.exports = Mahasiswa;
