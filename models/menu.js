const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    nature:{
        enum:['liquid','solid'],
        type:String,
        required:true
    }
});
const Menumodel = mongoose.model('Menu',menuSchema);
module.exports=Menumodel;