const express = require('express');
const router = express.Router();
const { resolve } = require('path');


router.get('/', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'));
});


module.exports = router;