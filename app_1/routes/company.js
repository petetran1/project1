const express = require('express');
const router = express.Router();


const companyCtrl = require('../controllers/company');

router.get('/', companyCtrl.getAllCompanies);


module.exports = router;