const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    sport: {
        type: String,
        required: true,
        unique: false
    },
    captainname: {
        type: String,
        required: true,
        unique: false
    },
    captainemail: {
        type: String,
        required: true,
        unique: false
    },
    primarycontact: {
        type: Number,
        required: true,
        unique: false
    },
    secondarycontact: {
        type: Number,
        required: true,
        unique: false
    },
    university: {
        type: String,
        required: true,
        unique: false
    },
    gender: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model('Sport',SportSchema);