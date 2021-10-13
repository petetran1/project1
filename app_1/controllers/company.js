const Company = require('../models/company');
const mongoose = require('mongoose');

exports.getAllCompanies = (req, res, next) => {
    mongoose.connect(process.env.CONNECTION_URL)
    .then(
        () => console.log('Successfully connected to MongoDB Atlas.')
    )
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

    Company.find().then(
      (companies) => {
        console.log('Querying all companies of Tran Corp.')
        res.status(200).json(companies);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

//mongoose.connection.close();
//console.log('Connection to MongoDB Atlas closed!');