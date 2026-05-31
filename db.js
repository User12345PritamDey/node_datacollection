//mongoose is a driver that helps to connect database with Nodejs
const mongoose = require('mongoose');//import mongoose driver for connecting database with Nodejs
//const mongoURL = 'mongodb://localhost:27017/mydatabase'//define the URL using this format we have to maintain this format and we can give any name instead of mydatabas
//const mongoURL = 'mongodb://hellopritamdey:hellopritam12345dey@ac-ipa5bsb-shard-00-00.e2m0r1t.mongodb.net:27017,ac-ipa5bsb-shard-00-01.e2m0r1t.mongodb.net:27017,ac-ipa5bsb-shard-00-02.e2m0r1t.mongodb.net:27017/mydatabase?ssl=true&replicaSet=atlas-nfovpl-shard-0&authSource=admin&appName=Cluster0';
require('dotenv').config();
const mongoURL = process.env.DB_URL;//its for mongodb atlAs
//const mongoURL = process.env.LOCAL_URL;//its local database URL
mongoose.connect(mongoURL);//connect the database
const db = mongoose.connection;//define default connection object now we will do everything with this object and will handle event listeners
db.on('connected',()=>{
    console.log('Database is connected');
    console.log('DB Name:', mongoose.connection.name);
})
db.on('disconnected',()=>{
    console.log('Database is disconnected');
  
})
db.on('error',(err)=>{
    console.log('Error in your connection',err);
})
module.exports=db;



