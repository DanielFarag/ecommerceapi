const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
	slug:String,
	name:String
});
module.exports = mongoose.model('tags',Tag);
