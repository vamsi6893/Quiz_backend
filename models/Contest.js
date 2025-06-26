const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    questions: [
        {
            question: String,
            options: [String],
            answer: Number,
        }
    ]
});

module.exports = mongoose.model('Contest', ContestSchema);