const express = require('express');
const router = express.Router();
const person = require('./../models/person.js');
//Post method of person to send the details
router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new person(data);//create new document using mongoose model
        const response = await newPerson.save();
        console.log('Data is saved');
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json({error:'Server Error'});
    }
})
//get method of person to get person details
router.get('/', async (req,res)=>{
    try{
        const finddata = await person.find();
        console.log("Data is here");
        res.status(200).json(finddata);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Not found'});
    }
})

//to get particular information of person
router.get('/:workType',async (req,res)=>{
    try{
        //extract the parameter from URL
        const workType = req.params.workType;
        if(workType=='chef'|| workType=='waiter'|| workType=='manager'){
            const response =  await person.find({work:workType});
            console.log("Data available");
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Data not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Server Error'});
    }
})
router.put('/:personid',async(req,res)=>{
    try{
        //extract the parameter
        const PersonId = req.params.personid;
        //access the document update
        const persondatatoupdate = req.body;
        const response = await person.findByIdAndUpdate(PersonId,persondatatoupdate,{
            new:true,//return the updated document
            runValidators:true//run the mongoose validators check that in new document the type and required field are filled or not
        });
        if(!response){
            return res.status(404).json({error:'Person is not found'});
        }
        console.log('Data updated');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Server Down'});
    }
})
router.delete('/:personid',async(req,res)=>{
   try{
     //extract the parameter
    const PersonId = req.params.personid;
    const response = await person.findByIdAndDelete(PersonId);
    if(!response){
        return res.status(404).json({error:'No data to delete'});
    }
    console.log('Data deleted');
    res.status(200).json(response);
   }catch(error){
    console.log(error);
    res.status(500).json({error:'Server Down'});
   }
})
module.exports=router;