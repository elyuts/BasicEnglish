var async = require('async');
var mongoose = require('./lib/mongoose');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err, results){
    disconnect();
    console.log(arguments);
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback){

    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback){
    var User = require('./models/user').User;
    var users = [
        new User({username: 'Vasya', password: '2342314'}),
        new User({username: 'Petya', password: '2344'}),
        new User({username: 'Admin', password: '234qwef4'})
    ];

    async.each(users, function(userData, callback){
        var user = new User(userData);
        user.save(callback);
    }, callback);
}

function disconnect(callback){
    mongoose.disconnect(callback);
}

/*'use strict';
const mongoose = require('./lib/mongoose');
const User = require('./models/user').User;

new Promise(function(resolve) {
    mongoose.connection.on('open', resolve());
}).then(function () {
    let db = mongoose.connection.db;
    db.dropDatabase();
}).then(function(modelName) {
    let models = Object.keys(mongoose.models);
    models.forEach(modelName => {
        mongoose.models[modelName].ensureIndexes();
    });
}).then(function(){
    let users = [
        new User({username: 'Vasya', password: '2342314'}),
        new User({username: 'Petya', password: '2344'}),
        new User({username: 'Admin', password: '234qwef4'})
    ];

    users.forEach(function(userdata) {
        let user = new User(userData);
        user.save();
    })

}).then(function () {
    mongoose.disconnect();
}).catch(function(err){
    mongoose.disconnect();
    console.log(err);
});
*/