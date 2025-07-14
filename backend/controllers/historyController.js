const History = require('../models/history');
const User = require('../models/user'); // Untuk include user data jika diperlukan

// @desc    Get user's prediction history
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res, next) => {
  const userId = req.user.id; // Diambil dari authMiddleware

  try {
    const history = await History.findAll({
      where: { userId },
      order: [['predictedAt', 'DESC']], // Urutkan dari yang terbaru
      include: [{
        model: User,
        as: 'user', // Sesuai alias yang didefinisikan di model History
        attributes: ['id', 'username', 'email'] // Pilih atribut yang ingin ditampilkan
      }]
    });
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

module.exports = { getHistory };