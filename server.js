const express = require('express');
const app = express();
const db = require('./db.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = require('./routes/personroute.js');
app.use('/person',router);
const mroute = require('./routes/menuroute.js');
app.use('/menu',mroute);
const student = require('./routes/studentroute.js');
app.use('/students',student);
//add your portnumber
app.listen(7000,()=>{
    console.log("localhost port number");
})

