const express = require('express');
const Score = require('../models/Score');
const router = express.Router();

router.get('/leaderboard/:category', async (req, res) => {
    const { category } = req.params;
    const top = await Score.aggregate([
        { $match: { category } },
        {
            $group: {
                _id: '$username',
                score: { $max: '$score' }
            }
        },
        {
            $project: {
                _id: 0,
                username: '$_id',
                score: 1
            }
        },
        { $sort: { score: -1 } },
        { $limit: 10 }
    ]);
    res.json(top);
});

module.exports = router;