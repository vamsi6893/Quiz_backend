const mongoose = require('mongoose');

const ContestLeaderboardSchema = new mongoose.Schema({
    contestId: mongoose.Schema.Types.ObjectId,
    username: String,
    score: Number,
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContestLeaderboard', ContestLeaderboardSchema);