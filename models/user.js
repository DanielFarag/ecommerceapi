const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	fname:{type:String,required:true,minlength:3,maxlength:20},
	lname:{type:String,required:true,minlength:3,maxlength:20},
	email:{type:String,required:true,indexs:true,unique:true},
	password:{type:String,required:true,minlength:9,maxlength:20},
	active:{type:Boolean,default:false},
	created_at:{type:Date,default:Date.now},
	updated_at:{type:Date,default:Date.now}
});


module.exports= mongoose.model('users',User);
