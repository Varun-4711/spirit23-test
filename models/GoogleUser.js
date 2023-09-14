const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
    username:String,
    googleid:String
});

module.exports = mongoose.model('GoogleUser',GoogleUserSchema);