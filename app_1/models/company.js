const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    employees: { type: Number},
    address: { type: String, required: true },
});

module.exports = mongoose.model('Company', companySchema);