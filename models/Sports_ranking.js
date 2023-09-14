const mongoose = require('mongoose');
const { Schema } = mongoose;

const Sports_ranking_schema = new Schema({
    name:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        default:"male"
    },
    category:{
        type:String,
        default:"NA",
    },
    subCategory:{
        type:String,
        default:"NA",
    },
    rank1:{
        type:String,
        default:"NA",
    },
    rank2:{
        type:String,
        default:"NA",
    },
    rank3:{
        type:String,
        default:"NA",
    },
    rank4:{
        type:String,
        default:"NA",
    },
});


const Sports_ranking = mongoose.model('sports_ranking',Sports_ranking_schema);
module.exports =Sports_ranking;