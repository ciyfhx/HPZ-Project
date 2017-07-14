var mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
  message:{type:String, default:"", required: true}
})

module.exports = mongoose.model('FeedbackSchema', FeedbackSchema, 'feedbacks');
