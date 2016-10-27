var mongoose = require('../lib/mongoose');
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

exports.Word = mongoose.model('Word', schema);