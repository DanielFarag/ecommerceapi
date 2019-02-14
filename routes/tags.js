const express = require('express');
const Tag = require('../models/tag.js');
const url = require('url');
const router = express.Router();



router.get('/',(req,res,next)=>{
	Tag.find({},(err,tags)=>{
		res.status(200).json(tags);
	})
})

router.get('/:id',(req,res,next)=>{
	let id = req.params.id;
	Tag.find({_id:req.params.id},(err,tag)=>{
		if(err) res.status(404).json(err);
		res.json(tag);
	})
})
router.post('/',(req,res,next)=>{
	let tag = new Tag({ slug:req.body.slug,name:req.body.name });
	tag.save().then(() => res.status(200).json(tag));
})
router.delete('/:id',(req,res,next)=>{
	Tag.deleteOne({_id:req.params.id},(err)=>{
		if(err) res.json(err);
		res.status(201).json({message:"The record has been deleted"});
	})
})
router.put('/:id',(req,res,next)=>{
	Tag.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true},(err,tag)=>{
		if(err) res.json(err);
		res.status(201).json(tag);
	})
})

module.exports = router;
