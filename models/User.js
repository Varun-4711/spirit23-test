const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    phone: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model('User',UserSchema);
