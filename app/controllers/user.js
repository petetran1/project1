const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//business logic for user sign up and login
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save().then(
            () => {
              res.redirect('/account/login');
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
    );
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
  
                alert('Incorrect email!');
                next();
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                  if (!valid) {
                    console.log('!valid');
                    alert('Incorrect password');
                    //res.status(401).json({error: new Error('Incorrect password!')});
                    next();
                  }
                  const token = jwt.sign(
                      { userId: user._id},
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn: '1h' });

                  res.redirect('/dashboard/');
                }
            )
        }
    );
}