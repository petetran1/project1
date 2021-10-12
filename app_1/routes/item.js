const express = require('express');
const router = express.Router();


const itemCtrl = require('../controllers/item');

router.post('/', itemCtrl.createItem);
router.get('/:id', itemCtrl.getAllItems);
router.put('/:id', itemCtrl.modifyItem);
router.delete('/:id', itemCtrl.deleteItem);


module.exports = router;