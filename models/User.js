const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    courses: { type: [String], default: [] },
    totalQuizzes: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 },
    lastAttempt: { type: Date, default: null }
});
module.exports = mongoose.model('User', userSchema);