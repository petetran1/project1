const Item = require('../models/item');

exports.createItem = (req, res, next) => {
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
        res.redirect(`/warehouse-detail/${req.body.warehouse}`)
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

exports.modifyItem = (req, res, next) => {
    const thing = new Item({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        warehouse_id: req.body.warehouse_id,
        date_in: req.body.date_in
    });
    Item.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Item updated successfully!'
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

exports.deleteItem = (req, res, next) => {
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
    Item.find({warehouse: req.params.id}).then(
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