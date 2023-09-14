const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({

    password:{
        type:String,
        required:true

    },
  
    date: { 
        type: Date,
         default: Date.now },
    
  });
  const Admin = mongoose.model('admin',adminSchema);


  module.exports =Admin;