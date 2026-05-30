const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    sem:{
        enum:[6,7,8],
        type:Number,
        required:true
    },
    roll:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    sgpa:{
        type:Number,
        required:true
    },
    no:{
        type:String,
        required:true
    }
});
const studentModel = mongoose.model('Student',studentSchema);
module.exports = studentModel;
