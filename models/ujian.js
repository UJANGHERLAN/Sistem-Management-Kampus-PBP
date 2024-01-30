const { query } = require('../db');// Pastikan module db sesuai dengan struktur koneksi database Anda

//Mendaftarkan
function daftarPesertaUjian(ujianId, namaPeserta, nimPeserta, callback) {
    // Implementasi logika untuk mendaftarkan peserta ujian
    const query = 'INSERT INTO peserta_ujian (ujian_id, nama_peserta, nim_peserta) VALUES (?, ?, ?)';
    db.query(query, [ujianId, namaPeserta, nimPeserta], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
  

// Fungsi untuk mendapatkan data ujian berdasarkan ID
function getUjianById(ujianId, callback) {
  // Implementasi logika untuk mendapatkan data ujian berdasarkan ujianId
  const query = 'SELECT * FROM ujian WHERE ujian_id = ?';
  db.query(query, [ujianId], (err, ujianData) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, ujianData[0]); // Mengembalikan data ujian sebagai objek tunggal
  });
}

// Fungsi untuk menambahkan ujian baru
function addUjian(namaUjian, mataKuliahId, mahasiswaId, tanggalUjian, callback) {
  // Implementasi logika untuk menambahkan ujian baru
  const query = 'INSERT INTO ujian (nama_ujian, mata_kuliah_id, mahasiswa_id, tanggal_ujian) VALUES (?, ?, ?, ?)';
  db.query(query, [namaUjian, mataKuliahId, mahasiswaId, tanggalUjian], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

// Ekspor fungsi-fungsi model untuk digunakan di controller atau routes
module.exports = {
  daftarPesertaUjian,
  getUjianById,
  addUjian,
};
