var mongoose = require('mongoose');

var ResourceSchema = new mongoose.Schema({
  name:{type:String, default:'unkown resource'},
  timestamp:{type:Date, default:Date.now},
})

module.exports = mongoose.model('ResourceSchema', ResourceSchema, 'resources');
