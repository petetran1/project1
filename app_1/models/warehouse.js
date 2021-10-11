const mongoose = require('mongoose');

const warehouseSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    address: { type: String, required: true },
    company: {type: String, required: true},
    capacity: {type: Number, required: true}
});

module.exports = mongoose.model('Warehouse', warehouseSchema);