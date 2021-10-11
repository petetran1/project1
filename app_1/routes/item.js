const express = require('express');
const router = express.Router();


const itemCtrl = require('../controllers/item');

router.get('/', itemCtrl.getAllItems);
router.post('/', itemCtrl.createItem);
router.get('/:id', itemCtrl.getOneItem);
router.put('/:id', itemCtrl.modifyItem);
router.delete('/:id', itemCtrl.deleteItem);


module.exports = router;