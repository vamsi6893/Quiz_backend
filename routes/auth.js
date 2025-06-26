const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../utils/auth');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (await User.findOne({ username })) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });
    res.json({ message: 'Registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
});

router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out' });
});

module.exports = router;