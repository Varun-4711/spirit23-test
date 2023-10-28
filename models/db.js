const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_LINK;

// const mongoURL =`mongodb+srv://rp8550495:vipZux-dogdo2-cyhxaz@cluster0.xk5bgmf.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

const connectToMongo=()=>{
    mongoose.connect(mongoURL).then(()=>{
        console.log("connected to mongo atlas successfully");
    })
};

module.exports = connectToMongo;