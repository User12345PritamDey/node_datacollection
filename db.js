const mongoose = require('mongoose');//import mongoose driver for connecting database with Nodejs
const mongoURL = 'mongodb://localhost:27017/mydatabase'//define the URL using this format we have to maintain this format and we can give any name instead of mydatabase
mongoose.connect(mongoURL);//connect the database
const db = mongoose.connection;//define default connection object now we will do everything with this object and will handle event listeners
db.on('connected',()=>{
    console.log('Database is connected');
})
db.on('disconnected',()=>{
    console.log('Database is disconnected');
})
db.on('error',(err)=>{
    console.log('Error in your connection',err);
})
module.exports=db;



