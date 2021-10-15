const express = require('express');
const cors = require('cors');
const {resolve} = require('path');
require('dotenv').config();

const itemRoutes = require('./routes/item');
const companyRoutes = require('./routes/company');
const warehouseRoutes = require('./routes/warehouse');

const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'))



app.use('/api/companies', companyRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/items', itemRoutes);
app.use('/warehouse' , (req, res) => {
    res.sendFile(resolve('public', 'views', 'warehouse.html'));
});


app.get(/.+api\/items\/.+/, (req, res) => {
    //console.log('good job')
    res.sendFile(resolve('public', 'views', 'warehouse.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(resolve('public', 'views', 'dashboard.html'));
});

app.get(/\/company\/.+/ , (req, res) => {
    res.sendFile(resolve('public', 'views', 'company.html'));
});


app.all('*', (req, res) => {
    //res.sendFile(resolve('public', 'views', 'index.html'));
    res.status(404).json({error: 'Page Not Found'});
});


module.exports = app;
