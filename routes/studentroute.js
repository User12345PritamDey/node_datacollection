const express = require('express');
const router = express.Router();
const student = require('./../models/student.js');
const { model } = require('mongoose');
//send details to server
router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newStudent = new student(data);//create new document using mongoose model
        const response = await newStudent.save();
        console.log("Successfully sent data");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server Down'});
    }
})
//get all details
router.get('/',async (req,res)=>{
    try{
        const response = await student.find();
        console.log('Data found');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server Down'});
    }
})
//get a particular detail
router.get('/:semType',async (req,res)=>{
    try{
        //extract the parameter
        const semType = req.params.semType;
        if(semType==6||semType==7||semType==8){
             const finddata = await student.find({sem:semType});
             console.log('Data found');
             res.status(200).json(finddata);
        }else{
            res.status(404).json({error:'Data is not there'})
        }
        

    }catch(error){
        console.log(error);
        res.status(500).json({error:'Server Down'});
    }
})
//update your data
router.put('/:studentid',async(req,res)=>{
    try{
        //extract the parameter
        const studentId = req.params.studentid;
        //extract the document
        const studentdata = req.body;
        const response = await student.findByIdAndUpdate(studentId,studentdata,{
            new:true,//return the updated document
            runValidators:true//run the mongoose validators in new document
        });
        if(!response){
            return res.status(404).json({error:'Data is not available'});
        }
        console.log('Data updated');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Server Down'});
    }
})
//delete the data
router.delete('/:studentid',async(req,res)=>{
    try{
        //extract the parameter
        const studentid = req.params.studentid;
        const response = await student.findByIdAndDelete(studentid);
        if(!response){
            return res.status(404).json({error:"Not found"});
        }
        console.log('Data deleted');
        res.status(500).json(response);
    }catch(err){
        console.log(error);
        res.status(500).json({error:'Server Down'});
    }
})

module.exports=router;