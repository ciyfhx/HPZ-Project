var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
  nameOfBooker:{type:String, default:'unkown user', required: true},
  timestamp:{type:Date, default:Date.now},
  resourceId:{type:mongoose.Schema.Types.ObjectId, required: true},
  duration:{type:Number, required: true}
})

module.exports = mongoose.model('BookingSchema', BookingSchema, 'booking');
