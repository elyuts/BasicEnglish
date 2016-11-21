const router = require('express').Router();
const Word = require('../models/word').Word;
const config = require('../config');
const tts = require('../lib/textToSpeech');

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

router.get('/speech/:word', (req, res, next) => {
  var word = req.params.word;

  tts.speech({
    key: config.get('ttsKey'),
    src: word,
    hl: 'en-gb',
    ssl: true,
    b64: true,
    callback: function (error, content) {
      res.send(content);
    }
  });
});

module.exports = router;
