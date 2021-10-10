const express = require('express');
const router = express.Router();
const { resolve } = require('path');

const userCtrl = require('../controllers/user');


router.get('/login', (req, res) => {
    res.sendFile(resolve('public', 'views', 'login.html'));
});
router.get('/signup', (req, res) => {
    res.sendFile(resolve('public', 'views', 'signup.html'));
});
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;