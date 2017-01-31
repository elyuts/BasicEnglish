const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user').User;
const InvalidatedToken = require('../models/invalidatedToken').InvalidatedToken;
const config = require('../config');
const tokenSecret = config.get('token:secret');
const tokenExpiresIn = config.get('token:expiresIn');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if(!username || !password)
    res.status(401).json({ success: false, message: "Authentication failed. Username or password can't be empty." });

  User.findOne({username: username})
    .then(user => {
      if (!user) {
        res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        if (user.checkPassword(password)) {
          // Create token if the password matched and no error was thrown
          const token = jwt.sign(user, tokenSecret, {
              expiresIn: tokenExpiresIn
          });
          res.status(200).json({ success: true, token: 'JWT ' + token });
        } else {
            res.status(401).json({ success: false, message: 'Authentication failed. Password did not match.' });
        }
      }
    });
});

router.post('/logout', (req, res) => {
  var token = req.body.token;

  jwt.verify(token.split(' ')[1], config.get('token:secret'), (err, decoded) => {
    if(err)
      console.error(err);

    var invalidatedToken = new InvalidatedToken({ token: token, expiresAt: decoded.exp * 1000});
    invalidatedToken.save()
    .catch(error =>{
      if(error)
        console.error(error);
    });

    res.sendStatus(200);
  });

});

module.exports = router;
