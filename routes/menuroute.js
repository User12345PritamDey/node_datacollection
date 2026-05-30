const express = require('express');
const router = express.Router();
const menu = require('./../models/menu.js');
//post the detail
router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newMenu = new menu(data);
        const response = await newMenu.save();
        console.log('Data saved');
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server down'});
    }
})
//get method of person to get person details
router.get('/', async (req,res)=>{
    try{
        const finddata = await menu.find();
        console.log("Data is here");
        res.status(200).json(finddata);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Not found'});
    }
})
router.get('/:natureType',async (req,res)=>{
    try{
        //extract the parameter from URL
        const natureType = req.params.natureType;
        if(natureType=='solid'|| natureType=='liquid'){
            const response =  await menu.find({nature:natureType});
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
router.put('/:menuid',async(req,res)=>{
    try{
        //extract the parameter
        const MenuId = req.params.menuid;
        const MenuDocumenttoUpdate = req.body;
        const response = await menu.findByIdAndUpdate(MenuId,MenuDocumenttoUpdate,{
            new:true,//Return the updated document
            runValidators:true//run mongoose validation
        });
        if(!response){
            return res.status(404).json({error:'Menu is not found'});
        }
        console.log('Menu updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server Down'});
    }

})
router.delete('/:menuid',async(req,res)=>{
    try{
        //extract the parameter
        const MenuId = req.params.menuid;
        const response = await menu.findByIdAndDelete(MenuId);
        if(!response){
            return res.status(404).json({error:'Data is not found'});
        }
        console.log("Data Deleted");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server Down'});
    }
})
module.exports=router;
