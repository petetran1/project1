const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');

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
app.use('/', homeRoutes);
app.use('/dashboard', stuffRoutes);
app.use('/account', userRoutes);



module.exports = app;
