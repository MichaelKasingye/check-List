const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const listSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('list',listSchema);