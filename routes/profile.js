const express = require('express');
const User = require('../models/User');
const { authenticateToken } = require('../utils/auth');
const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.sendStatus(404);
    res.json({
        username: user.username,
        email: user.email,
        courses: user.courses || [],
        totalQuizzes: user.totalQuizzes || 0,
        bestScore: user.bestScore || 0,
        lastAttempt: user.lastAttempt || null
    });
});



module.exports = router;