const express = require('express');
const router = express.Router();
const faker = require('faker');
const User = require('../models/user.js');
const Category = require('../models/category.js');
const Tag = require('../models/tag.js');
const Post = require('../models/post.js');

router.post('/users',(req,res,next)=>{
	let users = [];
	for (let i = 0; i < req.body.records; i++) {
		users.push({
			fname:faker.name.firstName(),
			lname:faker.name.lastName(),
			email:faker.internet.email(),
			password:faker.internet.password(),
			active:faker.random.boolean(),
			created_at:faker.date.recent(),
			updated_at:faker.date.recent()
		})
	}
	User.insertMany(users, (err)=>{
		if(err) res.json({created:false});
		res.json({created:true})
	});
})
router.post('/categories',(req,res,next)=>{
	let categories = [];
	for (let i = 0; i < req.body.records; i++) {
		categories.push({ slug: faker.lorem.slug(),name:faker.lorem.words(4) })
	}
	Category.insertMany(categories, function(err) {
		if(err) res.json({created:false});
		res.json({created:true})
	});
})

router.post('/tags',(req,res,next)=>{
	let tags = [];
	for (let i = 0; i < req.body.records; i++) {
		tags.push({ slug: faker.lorem.slug(),name:faker.lorem.words(4) })
	}
	Tag.insertMany(tags, function(err) {
		if(err) res.json({created:false});
		res.json({created:true})
	});
})
function randUser(){
	return new Promise((resolve,reject)=>{
		User.countDocuments().exec((err,count)=>{
			if(err) resolve(false);

			var random = Math.floor(Math.random() * count)
			User.findOne().skip(random).exec((err,user)=>{
				if(err) resolve(false);
				resolve(user._id);
			})
		})
	})
}
function randCategoies(){
	return new Promise((resolve,reject)=>{
		Category.countDocuments().exec((err,count)=>{
			if(err) resolve([]);
			var random=Math.floor(Math.random()*count);
			Category.find({}).skip(random).limit(7).exec((err,categories)=>{
				if(err) resolve([]);
				var randomCat=Math.floor(Math.random()*7);
				let ids = categories.slice(0,randomCat).map(cat=>cat._id);
				resolve(ids);
			})
		})
	});
}
function randTags(){
	return new Promise((resolve,reject)=>{
		Tag.countDocuments().exec((err,count)=>{
			if(err) resolve([]);
			var random=Math.floor(Math.random()*count);
			Tag.find({}).skip(random).limit(5).exec((err,tags)=>{
				if(err) resolve([]);
				var randomTag=Math.floor(Math.random()*5);
				let ids = tags.slice(0,randomTag).map(tag=>tag._id);
				resolve(ids);
			})
		})
	});
}

function randMetas(){
	return new Promise((resolve,reject)=>{
		let meta = [
			{key:'thumbnail',value:faker.image.imageUrl(faker.random.number({min: 300,max: 350}))},
			{key:'excerpt',value:faker.lorem.paragraphs(1)},
			{key:'rating',value:0}
		]
		var random=Math.floor(Math.random()*meta.length);
		resolve(meta.slice(random,meta.length));
	});
}


router.post('/posts', async (req,res,next)=>{
	let posts = [];

	for (let i = 1; i < req.body.records; i++) {
		let user = await randUser()
		let categories = await randCategoies()
		let tags = await randTags()
		let metas = await randMetas()
		posts.push({
			id:i,
			slug:faker.lorem.slug(),
			title:faker.lorem.words(4),
			user:faker.random.number(100),
			content:faker.lorem.paragraphs(3),
			created_at:faker.date.recent(),
			updated_at:faker.date.recent(),
			comments_count:faker.random.number({min:0,max:100}),
			user:user,
			categories:categories,
			tags:tags,
			metas:metas,
		});
	}

	Post.insertMany(posts, function(err) {
		if(err) res.json(err);
		res.json({created:true})

	});
})

module.exports = router;
