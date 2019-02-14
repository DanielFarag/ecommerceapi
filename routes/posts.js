const express = require('express');
const url = require('url');
const Post = require('../models/post.js');

const router = express.Router();


router.get('/',(req,res,next)=>{
	let limit =20;
	let get  = url.parse(req.url,true).query;
	if(get.count != undefined){
		limit = parseInt(get.count);
	}
	Post.find({}).limit(limit).populate(['user','categories','tags']).exec((err,posts)=>{
		if(err) res.status(404).json(err);
		res.status(202).json(posts);
	});
})


router.get('/:id',(req,res,next)=>{
	Post.find({_id:req.params.id},(err,post)=>{
 		if(err) res.status(404).json(err);
 		res.status(202).json(post);
 	});
})

router.post('/',(req,res,next)=>{
	let post = new Post();
	post.slug=req.body.slug;
	post.title=req.body.title;
	post.content=req.body.content;
	post.created_at=req.body.created_at;
	post.updated_at=req.body.updated_at;
	post.comment_count=req.body.comment_count;
	post.user=req.body.user;
	post.categories=req.body.categories;
	post.tags=req.body.tags;
	post.metas=req.body.metas;
	post.save().then(() =>{
		Post.findOne({_id:post._id}).populate(['user','categories','tags']).exec((err,post)=>{
			if(err) res.status(404).json(err);
			res.status(200).json(post)
		})
	}).catch(err=>{
		res.status(404).json(err)
	});
})

module.exports = router;
