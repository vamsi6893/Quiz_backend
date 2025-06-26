const express = require('express');
const router = express.Router();
const Contest = require('../models/Contest');
const ContestLeaderboard = require('../models/ContestLeaderboard');

// Create a new contest
router.post('/', async (req, res) => {
    try {
        const { title, description, creator, questions } = req.body;
        const contest = await Contest.create({ title, description, creator, questions });
        res.json({ contestId: contest._id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create contest' });
    }
});

// Get contest by ID
router.get('/:id', async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        if (!contest) return res.status(404).json({ error: 'Not found' });
        res.json(contest);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contest' });
    }
});

// Submit score to leaderboard
router.post('/:id/submit', async (req, res) => {
    try {
        const { username, score } = req.body;
        await ContestLeaderboard.create({
            contestId: req.params.id,
            username,
            score,
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit score' });
    }
});

// Get leaderboard for a contest
router.get('/:id/leaderboard', async (req, res) => {
    try {
        const leaders = await ContestLeaderboard.find({ contestId: req.params.id })
            .sort({ score: -1, time: 1 });
        res.json(leaders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get all contests or contests by creator
router.get('/', async (req, res) => {
    const { creator, limit } = req.query;
    try {
        let query = creator ? Contest.find({ creator }) : Contest.find();
        if (limit && Number(limit) > 0) query = query.limit(Number(limit));
        const contests = await query.sort({ _id: -1 });
        res.json(contests);
    } catch {
        res.status(500).json({ error: 'Failed to fetch contests' });
    }
});

module.exports = router;