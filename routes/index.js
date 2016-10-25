const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user').User;
const secret = require('../config').get('secret');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if(!username || !password)
    res.status(401).json({ success: false, message: "Authentication failed. Username or password can't be empty." });

  User.findOne({username: username}, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      if (user.checkPassword(password)) {
        // Create token if the password matched and no error was thrown
        const token = jwt.sign(user, secret, {
            expiresIn: 10080 // in seconds
        });
        res.status(200).json({ success: true, token: 'JWT ' + token });
      } else {
          res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
      }

    }
  })
});

router.get('/logout', function(req, res, next) {
  //to do
  next();
});


module.exports = router;
