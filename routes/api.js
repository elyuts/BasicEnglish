var express = require('express');
var router = express.Router();
const Word = require('../models/word').Word;

/* GET users listing. */
router.get('/getFullDictionary', (req, res, next) => {
  Word.find({}, (err, users) => {
    res.send(users);
  });
});

module.exports = router;
