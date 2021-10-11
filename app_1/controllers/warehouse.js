const Warehouse = require('../models/warehouse');


exports.getAllWarehouses = (req, res, next) => {
    Warehouse.find({company: req.params.id}).then(
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
/*
exports.getOneWarehouse = (req, res, next) => {
    Warehouse.findOne({
      company: req.params.id
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
*/