const express = require('express');
const url = require('url');
const User = require('../models/user.js');
const router = express.Router();


router.get('/',(req,res,next)=>{
	User.find({},(err,users)=>{
		res.status(200).json(users);
	})
})
router.post('/',(req,res,next)=>{
	let user = new User();
	user.fname = req.body.first_name;
	user.lname = req.body.last_name;
	user.email = req.body.email;
	user.password = req.body.password;
	user.active = req.body.active;
	user.created_at = req.body.created_at;
	user.updated_at = req.body.updated_at;
	user.save().then(() => res.status(200).json(user)).catch(err=>res.status(404).json(err));
})
router.get('/:id',(req,res,next)=>{
	let id = req.params.id;
	User.find({_id:req.params.id},(err,user)=>{
		if(err) res.status(404).json(err);
		res.json(user);
	})
})
module.exports = router;
