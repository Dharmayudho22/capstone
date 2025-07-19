import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Import model User

dotenv.config();

// Fungsi untuk membuat token JWT
const generateToken = (uid, email) => {
    return jwt.sign({ uid, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const register = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body;

    if (!email || !password || !name || !phoneNumber) {
        return res.status(400).json({ message: 'Semua bidang harus diisi.' });
    }

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email sudah terdaftar.' });
        }

        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru di PostgreSQL
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            phoneNumber,
        });

        const token = generateToken(newUser.id, newUser.email);

        res.status(201).json({
            message: 'Registrasi berhasil!',
            token,
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });

    } catch (error) {
        console.error('Error saat registrasi:', error.message);
        res.status(500).json({ message: 'Registrasi gagal. Silakan coba lagi.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    try {
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Kredensial tidak valid.' });
        }

        // Bandingkan password yang diinput dengan password ter-hash di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Kredensial tidak valid.' });
        }

        const token = generateToken(user.id, user.email);

        res.status(200).json({
            message: 'Login berhasil!',
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });

    } catch (error) {
        console.error('Error saat login:', error.message);
        res.status(500).json({ message: 'Login gagal. Silakan coba lagi.' });
    }
};