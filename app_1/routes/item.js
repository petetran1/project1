const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const {resolve} = require('path');

const itemCtrl = require('../controllers/item');



router.post('/:warehouse', itemCtrl.createItem);
router.get('/:warehouse', itemCtrl.getAllItems);
router.get('/:warehouse/:id', itemCtrl.getOneItem);
router.post('/:warehouse/:id', itemCtrl.updateItem);
router.delete('/:warehouse/:id', itemCtrl.deleteItem);



module.exports = router;