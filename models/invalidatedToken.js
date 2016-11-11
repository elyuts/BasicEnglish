var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    token:{
        type: String,
        required: true
    },
    expiresAt:{
        type: Number,
        required: true
    }
});

exports.InvalidatedToken = mongoose.model('InvalidatedToken', schema);