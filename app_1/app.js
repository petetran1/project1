const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {resolve} = require('path');
require('dotenv').config();

const itemRoutes = require('./routes/item');
const companyRoutes = require('./routes/company');
const warehouseRoutes = require('./routes/warehouse');

const app = express();

mongoose.connect(process.env.CONNECTION_URL)
        .then(
            () => console.log('Successfully connected to MongoDB Atlas.')
        )
        .catch((error) => {
            console.log('Unable to connect to MongoDB Atlas!');
            console.error(error);
        });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'))
app.use('/company', companyRoutes);
app.use('/warehouse', warehouseRoutes);
app.use('/item', itemRoutes);
app.get('/dashboard', (req, res) => {
    res.sendFile(resolve('public', 'views', 'company.html'));
});
app.get(/\/warehouse-detail\/.+/ , (req, res) => {
    res.sendFile(resolve('public', 'views', 'item.html'));
});
app.get(/\/company-detail\/.+/ , (req, res) => {
    res.sendFile(resolve('public', 'views', 'warehouse.html'));
});
app.get('*', (req, res) => {
    //res.sendFile(resolve('public', 'views', 'index.html'));
    res.status(404).json({error: 'Page Not Found'});
});


module.exports = app;
