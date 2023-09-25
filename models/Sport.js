const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
    name: {
      type: String,
      required: false,
      unique:false,
    },
    email: {
      type: String,
      required: false,
      unique: false,
      index:true, unique:false,sparse:true, // Ensure unique emails for participants
    },
  });

const SportSchema = new Schema({
 
    sport: {
        type: String,
        required: true,
        unique: false,
    },
    captainname: {
        type: String,
        required: true,
        unique: false,
        
    },
    captainemail: {
        type: String,
        required: true,
        unique: false,
        index:true, unique:false,sparse:true,
    },
    primarycontact: {
        type: Number,
        required: true,
    },
    secondarycontact: {
        type: Number,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        unique: false,
    },
    participants: [participantSchema],
},{timestamps: true,});

module.exports = mongoose.model('Sport',SportSchema);
