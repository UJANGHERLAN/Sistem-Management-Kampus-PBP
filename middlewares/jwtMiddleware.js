// jwtMiddleware.js
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  const token = jwt.sign({ user: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token tidak valid.' });
  }
};

module.exports = {
  createToken,
  verifyToken,
};