const jwt = require('jsonwebtoken');

//middleware which protects selected routes, and ensure that a user is authenticated 
//before allowing their requests to go through
module.exports = (req, res, next) => {
    try {
        console.log('auth.js ' + Object.keys(req.body));
        const token = req.headers["x-access-token"];
        //const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        console.log('req userId: ' + req.body.userId);
        console.log('decodedToken userId: ' + userId);
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
    } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
    }
}

