const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {type: String, required: true},
    quantity: Number,
    description: String,
    price: String,
    warehouse: {type: String, required: true},
    date_in: String
});

module.exports = mongoose.model('Item', itemSchema);