const mongoose = require('mongoose');
const mongoURL =`mongodb+srv://varunsaxenaiitg:KV2hUUlEv3tdM26v@cluster0.1tju1nl.mongodb.net/`;
// const mongoURL =`mongodb+srv://rp8550495:vipZux-dogdo2-cyhxaz@cluster0.xk5bgmf.mongodb.net/?retryWrites=true&w=majority`;


const connectToMongo=()=>{
    mongoose.connect(mongoURL).then(()=>{
        console.log("connected to mongo atlas successfully");
    })
};

module.exports = connectToMongo;