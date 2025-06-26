const express = require('express');
const Score = require('../models/Score');
const User = require('../models/User');
const { authenticateToken } = require('../utils/auth');
const router = express.Router();

router.post('/submit-score', authenticateToken, async (req, res) => {
    const { category, score } = req.body;
    const username = req.user.username;

    await Score.create({ username, category, score });

    // Update user stats
    const user = await User.findOne({ username });
    if (user) {
        // Add course if not present
        if (!user.courses.includes(category)) {
            user.courses.push(category);
        }
        // Increment total quizzes
        user.totalQuizzes = (user.totalQuizzes || 0) + 1;
        // Update best score
        if (!user.bestScore || score > user.bestScore) {
            user.bestScore = score;
        }
        // Update last attempt
        user.lastAttempt = new Date();
        await user.save();
    }

    res.json({ message: 'Score saved and user updated' });
});

module.exports = router;