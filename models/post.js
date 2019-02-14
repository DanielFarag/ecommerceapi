const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	slug:{type:String,required:true,unique:true,index:true,minlength:5,maxlength:70},
	title:{type:String,required:true,minlength:10,maxlength:70},
	content:{type:String,required:true,minlength:10},
	created_at:{type:Date,default:Date.now},
	updated_at:{type:Date,default:Date.now},
	comment_count:{type:Number,default:0},
	metas:{type:[{key:String,value:String}],default:[]},
	user:{type:Schema.Types.ObjectId,ref:'users',required:true},
	categories:[{type:Schema.Types.ObjectId,ref:'categories'}],
	tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
})

module.exports = mongoose.model('posts',postSchema);
