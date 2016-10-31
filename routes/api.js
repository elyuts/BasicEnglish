var express = require('express');
var router = express.Router();
const Word = require('../models/word').Word;

/* GET users listing. */
router.get('/getFullDictionary', (req, res, next) => {
  Word.find({}, (err, words) => {
    if (err)
      throw err;

    res.send(words);
  });
});

router.get('/getRandomWords/:sizeOfWordSet', (req, res, next) => {
  var sizeOfWordSet = req.params.sizeOfWordSet;

  Word.findRandom({}, {}, {limit: sizeOfWordSet}, (err, words) => {
    if (err)
      throw err;

    res.send(words);
  });
});

module.exports = router;
