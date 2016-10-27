'use strict';
const async = require('async');
const mongoose = require('./lib/mongoose');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers,
    createWords
], function(err, results){
    disconnect();
    console.log(arguments);
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    let db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback){

    async.each(Object.keys(mongoose.models), (modelName, callback) => {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback){
    const User = require('./models/user').User;
    let users = [
        new User({username: 'Vasya', password: '2342314'}),
        new User({username: 'Petya', password: '2344'}),
        new User({username: 'Admin', password: '234qwef4'})
    ];

    async.each(users, (userData, callback) => {
        let user = new User(userData);
        user.save(callback);
    }, callback);
}

function createWords(callback){
    const Word = require('./models/word').Word;

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

    async.each(words, (wordData, callback) => {
        let word = new Word(wordData);
        word.save(callback);
    }, callback);
}

function disconnect(callback){
    mongoose.disconnect(callback);
}

/*'use strict';
 const mongoose = require('./lib/mongoose');
 const User = require('./models/user').User;
 const Word = require('./models/word').Word;

 new Promise(resolve => {
 mongoose.connection.on('open', resolve);
 })
 .then(() => {
 mongoose.connection.db.dropDatabase(function(){});
 })
 .then(() => {
 let models = Object.keys(mongoose.models);
 models.forEach(modelName => {
 mongoose.models[modelName].ensureIndexes();
 });
 })
 .then(() => {
 let users = [
 new User({username: 'Vasya', password: '2342314'}),
 new User({username: 'Petya', password: '2344'}),
 new User({username: 'Admin', password: '234qwef4'})
 ];

 users.forEach(userData => {
 let user = new User(userData);
 user.save();
 });
 /*
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

 words.forEach(wordData => {
 let word = new Word(wordData);
 word.save();
 });
 })
 .then(() => {
 mongoose.disconnect();
 })
 .catch(err => {
 mongoose.disconnect();
 console.log(err);
 });
 */
