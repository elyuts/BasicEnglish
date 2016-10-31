var mongoose = require('../lib/mongoose');
var random = require('mongoose-simple-random');
var Schema = mongoose.Schema;

var schema = new Schema({
    engword:{
        type: String,
        unique: true,
        required: true
    },
    ruswords:{
        type: [String],
        required: true
    }
});
schema.plugin(random);

exports.Word = mongoose.model('Word', schema);