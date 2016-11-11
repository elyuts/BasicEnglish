const InvalidatedToken = require('../models/invalidatedToken').InvalidatedToken;

module.exports = (req, res, next) => {
    var token = req.headers.authorization;
    InvalidatedToken.findOne({token: token})
    .then(invalidToken => {
        if (invalidToken) {
            res.status(401).json({ success: false, message: "Authentication failed. User is logged out. Please login again." });
        } else {
            next();
        }
    })
    .catch(err => {
        console.error(`Error during request of invalidatedToken: ${token}`);
        next();
    });
};