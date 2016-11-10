'use strict';
 const mongoose = require('./lib/mongoose');
 const User = require('./models/user').User;
 const Word = require('./models/word').Word;

 function connect(){
     console.log('connect open');
     return new Promise(resolve => {
         mongoose.connection.on('open', resolve);
     });
 }

 function dropDb(){
     console.log('dropDb');
     return new Promise(resolve => {
         mongoose.connection.db.dropDatabase(resolve);
     });
 }

 function ensureModelIndexes() {
     console.log('ensureModelIndexes');
     let models = Object.keys(mongoose.models);

     for (let modelName of models) {
         mongoose.models[modelName].ensureIndexes();
     }
 }

 function createUsers() {
     console.log('createUsers');

     let users = [
         new User({username: 'Vasya', password: '2342314'}),
         new User({username: 'Petya', password: '2344'}),
         new User({username: 'Admin', password: '234qwef4'})
     ];

     let userSaveFunctions = users.map(userData => new Promise((resolve, reject) => {
         let user = new User(userData);
         user.save(err => {
             console.log('user saved');
             if(err) reject(err);
             resolve();
         });
     }));

     return Promise.all(userSaveFunctions);
 }

 function createWords() {
     console.log('createWords');

     let words = [
         new Word({engword: 'angle', ruswords: [ 'угол']}),
         new Word({engword: 'ant', ruswords: ['муравей']}),
         new Word({engword: 'apple', ruswords: ['яблоко']}),
         new Word({engword: 'arch', ruswords: ['арка', 'дуга', 'выгибать']}),
         new Word({engword: 'arm', ruswords: ['рука']}),
         new Word({engword: 'army', ruswords: ['армия']}),
         new Word({engword: 'bag', ruswords: ['сумка']}),
         new Word({engword: 'ball', ruswords: ['мяч']}),
         new Word({engword: 'bank', ruswords: ['банк']}),
         new Word({engword: 'basin', ruswords: ['бассейн']}),
         new Word({engword: 'basket', ruswords: ['корзина']}),
         new Word({engword: 'bath', ruswords: ['ванна', 'купаться']}),
         new Word({engword: 'bed', ruswords: ['кровать']}),
         new Word({engword: 'bee', ruswords: ['пчела']}),
         new Word({engword: 'bell', ruswords: ['колокол']}),
         new Word({engword: 'berry', ruswords: ['ягода']}),
         new Word({engword: 'bird', ruswords: ['птица']}),
         new Word({engword: 'blade', ruswords: ['лезвие']}),
         new Word({engword: 'board', ruswords: ['доска']}),
         new Word({engword: 'boat', ruswords: ['лодка', 'судно']}),
         new Word({engword: 'bone', ruswords: ['ключ']}),
         new Word({engword: 'book', ruswords: ['книга']}),
         new Word({engword: 'boot', ruswords: ['ботинок', 'загружать']}),
         new Word({engword: 'bottle', ruswords: ['бутылка']}),
         new Word({engword: 'box', ruswords: ['коробка']}),
         new Word({engword: 'boy', ruswords: ['мальчик']}),
         new Word({engword: 'brain', ruswords: ['мозг']}),
         new Word({engword: 'brake', ruswords: ['тормоз', 'тормозить']}),
         new Word({engword: 'branch', ruswords: ['ветка', 'отделение']}),
         new Word({engword: 'brick', ruswords: ['кирпич']}),
         new Word({engword: 'bridge', ruswords: ['мост']}),
         new Word({engword: 'brush', ruswords: ['кисть', 'щётка']}),
         new Word({engword: 'bucket', ruswords: ['ведро', 'черпать']}),
         new Word({engword: 'bulb', ruswords: ['луковица', 'выпирать']}),
         new Word({engword: 'button', ruswords: ['кнопка', 'застегивать']}),
         new Word({engword: 'baby', ruswords: ['младенец', 'ребенок']})
     ];

     //http://iloveenglish.ru/stories/view/basic_english_ch_2_850_samikh_neobkhodimikh_anglijskikh_slov

     let wordSaveFunctions = words.map(wordData => new Promise((resolve, reject) => {
         let word = new Word(wordData);
         word.save(err => {
             if(err) reject(err);
             resolve();
         });
     }));

     return Promise.all(wordSaveFunctions);
 }

 function disconnect() {
     console.log('connection close');
     mongoose.disconnect();
 }

 connect()
 .then(dropDb)
 .then(ensureModelIndexes)
 .then(createUsers)
 .then(createWords)
 .then(disconnect)
 .catch(err => {
     console.log('catch you!');
     disconnect();
     console.log(err);
 });