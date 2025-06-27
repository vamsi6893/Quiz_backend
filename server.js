require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const leaderboardRoutes = require('./routes/leaderboard');
const contestRoutes = require('./routes/contest');
const app = express();

// const allowedOrigins = ['http://localhost:5173', 'https://brain-battle-kappa.vercel.app'];

app.use(cors({
  origin:[
    "http://localhost:5173",
    "https://brain-battle-kappa.vercel.app"
  ], // Use "*" to allow all origins, or specify allowedOrigins array
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //
  credentials: true // Optional: if you're using cookies or HTTP auth
}));
app.use(bodyParser.json());
app.use('/api', require('./routes/score'))
app.use('/api/contest', contestRoutes);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));