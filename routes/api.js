const router = require('express').Router();
const Word = require('../models/word').Word;

router.get('/isAuthorized', (req, res, next) => {
  res.status(200).json({ success: true });
});

// GET users listing.
router.get('/getFullDictionary', (req, res, next) => {
  Word.find({})
  .then(words => res.send(words));
});

router.get('/getRandomWords/:sizeOfWordSet', (req, res, next) => {
  var sizeOfWordSet = parseInt(req.params.sizeOfWordSet, 10);

  Word.findRandom({}, {}, {limit: sizeOfWordSet}, (err, words) => {
    if (err)
      throw err;

    res.send(words);
});
});

module.exports = router;
