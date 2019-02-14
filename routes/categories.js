const express = require('express');
const Category = require('../models/category.js');
const url = require('url');
const router = express.Router();



router.get('/',(req,res,next)=>{
	Category.find({},(err,categories)=>{
		res.status(200).json(categories);
	})
})

router.get('/:id',(req,res,next)=>{
	let id = req.params.id;
	Category.find({_id:req.params.id},(err,cat)=>{
		if(err) res.status(404).json(err);
		res.json(cat);
	})
})
router.post('/',(req,res,next)=>{
	let cat = new Category({ slug:req.body.slug,name:req.body.name });
	cat.save().then(() => res.status(200).json(cat));
})
router.delete('/:id',(req,res,next)=>{
	Category.deleteOne({_id:req.params.id},(err)=>{
		if(err) res.json(err);
		res.status(201).json({message:"The record has been deleted"});
	})
})
router.put('/:id',(req,res,next)=>{
	Category.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true},(err,cat)=>{
		if(err) res.json(err);
		res.status(201).json(cat);
	})
})

module.exports = router;
