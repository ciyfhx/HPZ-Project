var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  _id:{type:mongoose.Schema.Types.ObjectId},
  username:{type:String, default:'unkown resource', require:true},
  password:{type:String, require:true},
  privillege:{type:Number, require:true}
})

module.exports = mongoose.model('UsersSchema', UsersSchema, 'users');
