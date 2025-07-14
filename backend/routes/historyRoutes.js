const express = require('express');
const { getHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getHistory);

module.exports = router;