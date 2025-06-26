// models/Score.js
const mongoose = require('mongoose');
const scoreSchema = new mongoose.Schema({
    username: String,
    category: String,
    score: Number,
});
module.exports = mongoose.model('Score', scoreSchema);