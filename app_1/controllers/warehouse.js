const Warehouse = require('../models/warehouse');
const mongoose = require('mongoose');

exports.getWarehouses = (req, res, next) => {
    mongoose.connect(process.env.CONNECTION_URL)
    .then(
        () => console.log('Successfully connected to MongoDB Atlas.')
    )
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

    console.log('Querying warehouses of ', req.params.company);
    Warehouse.find({company: req.params.company}).then(
      (warehouses) => {
        res.status(200).json(warehouses);
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