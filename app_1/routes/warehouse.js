const express = require('express');
const router = express.Router();
const {resolve} = require('path');

const warehouseCtrl = require('../controllers/warehouse');

router.get('/:company', warehouseCtrl.getWarehouses);

module.exports = router;