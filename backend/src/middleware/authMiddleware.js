import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Import model User

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak disediakan.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Cari pengguna di database berdasarkan ID dari token
        const user = await User.findByPk(decoded.uid);

        if (!user) {
            return res.status(403).json({ message: 'Token tidak valid atau pengguna tidak ditemukan.' });
        }

        req.user = user; // Tambahkan objek user lengkap ke objek request
        next();
    } catch (err) {
        console.error('Verifikasi token gagal:', err);
        return res.status(403).json({ message: 'Token tidak valid atau kadaluarsa.' });
    }
};

export default authMiddleware;