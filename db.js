const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Membuat koneksi ke database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// Mengekspor modul untuk digunakan di tempat lain
module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(sql, values, (err, results) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
    });
  },
  pool: pool,
};
