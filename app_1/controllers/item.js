const Item = require('../models/item');
const {resolve} = require('path');
const mongoose = require('mongoose');

exports.createItem = (req, res, next) => {
    mongoose.connect(process.env.CONNECTION_URL)
    .then(
        () => console.log('Successfully connected to MongoDB Atlas.')
    )
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

    const thing = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      description: req.body.description,
      price: req.body.price,
      warehouse: req.body.warehouse,
      date_in: req.body.date_in
    });

    thing.save().then(
      () => {
        res.redirect(`/warehouse/${req.body.warehouse}`);
      }
    ).then(
      () => {
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

exports.getOneItem = (req, res, next) => {
    mongoose.connect(process.env.CONNECTION_URL)
    .then(
        () => console.log('Successfully connected to MongoDB Atlas.')
    )
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });
    Item.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}

exports.updateItem = (req, res, next) => {
    mongoose.connect(process.env.CONNECTION_URL)
    .then(
        () => console.log('Successfully connected to MongoDB Atlas.')
    )
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });
    console.log('here is the body of req in modifyItem controller', req.body);
    const item = new Item({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        warehouse: req.body.warehouse,
        date_in: req.body.date_in
    });
    
    Item.findByIdAndUpdate(req.params.id, item, {new: true}).then( 
        item => {
          if(!item) {
            res.status(404).send({message: "Item not found with id " + req.params.id})
          } else {
            res.redirect(`/warehouse/${req.body.warehouse}`);
          }
          
        }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
    //res.redirect(`/warehouse/${req.body.warehouse}`);
}

exports.deleteItem = (req, res, next) => {
    mongoose.connect(process.env.CONNECTION_URL)
    .then(
        () => console.log('Successfully connected to MongoDB Atlas.')
    )
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

    Item.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

exports.getAllItems = (req, res, next) => {
    mongoose.connect(process.env.CONNECTION_URL)
    .then(
        () => console.log('Successfully connected to MongoDB Atlas.')
    )
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

    Item.find({warehouse: req.params.warehouse}).then(
      (things) => {
        res.status(200).json(things);
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