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
      price: '$'+req.body.price,
      warehouse: req.body.warehouse,
      date_in: req.body.date_in
    });
    thing.save().then(
      () => {
        res.sendFile(resolve('public', 'views', 'warehouse.html'));
        console.log(thing);
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
            res.sendFile(resolve('public', 'views', 'warehouse.html'));
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

    if (req.query.hasOwnProperty('query') === false || req.query.query === '') {
        console.log('empty query');
        Item.find({warehouse: req.params.warehouse}).then(
          (things) => {
            res.status(200).json(things);
            //console.log('this is thing', things);
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
    } else {
      if (req.query.filter == 'name' || req.query.hasOwnProperty('filter') === false) {
        Item.find({warehouse: req.params.warehouse, name: { "$regex": req.query.query, "$options": "i" }}).then(
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
      if (req.query.filter == 'quantity') {
        console.log('in here', req.query.query)
        Item.find({ warehouse: req.params.warehouse, quantity: { $eq: parseInt(req.query.query) } }).then(
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
      if (req.query.filter == 'description') {
        Item.find({warehouse: req.params.warehouse, description: { "$regex": req.query.query, "$options": "i" }}).then(
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
      if (req.query.filter == 'price') {
        Item.find({warehouse: req.params.warehouse, price: req.query.query}).then(
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
      if (req.query.filter == 'date') {
        Item.find({warehouse: req.params.warehouse, date_in: { "$regex": req.query.query, "$options": "i" }}).then(
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
    }
  }

  //mongoose.connection.close();
  //console.log('Connection to MongoDB Atlas closed!');