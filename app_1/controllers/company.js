const Company = require('../models/company');

exports.getAllCompanies = (req, res, next) => {
    Company.find().then(
      (companies) => {
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