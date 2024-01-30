const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mahasiswaRouter = require('./routes/mahasiswaRoutes');
const mataKuliahRouter = require('./routes/mataKuliahRoutes');
const penilaianRouter = require('./routes/penilaianRoutes');
const ujianRouter = require('./routes/ujianRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Gunakan cors di sini
app.use(bodyParser.json());

// Rute-rute
app.use('/api/mahasiswa', mahasiswaRouter);
app.use('/api/matakuliah', mataKuliahRouter);
app.use('/api/penilaian', penilaianRouter);
app.use('/api/ujian', ujianRouter);

// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' });
});

// Handle 500 - Internal Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan server.' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

