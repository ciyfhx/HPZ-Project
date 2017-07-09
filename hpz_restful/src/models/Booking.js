var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
  bookerId:{type:mongoose.Schema.Types.ObjectId, required: true},
  bookTiming:{type:Date, default:Date.now},
  resourceId:{type:mongoose.Schema.Types.ObjectId, required: true},
  duration:{type:Number, required: true}
})

module.exports = mongoose.model('BookingSchema', BookingSchema, 'booking');
