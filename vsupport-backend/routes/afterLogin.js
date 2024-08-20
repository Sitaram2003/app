const express = require('express');
const path = require('path');
const router = express.Router();
const authenticateToken = require('./Auth').authenticateToken;

router.get('/', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/after_login.html'));
});

module.exports = router;
