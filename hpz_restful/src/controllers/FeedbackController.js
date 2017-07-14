var Feedback = require('../models/Feedback.js');

module.exports = {
  find: function(params, callback){
    Feedback.find(params, function(err, feedback){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, feedback);
    });
  },
  findById: function(id, callback){
    Feedback.findById(id, function(err, feedback){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, feedback);
    });

  },
  create: function(params, callback){
     Feedback.create(params, function(err, feedback){
       if(err){
         callback(err, null);
         return;
       }
       callback(null, feedback);

     });
  },
  update: function(id, params, callback){
    Feedback.findByIdAndUpdate(id, params, {new:true}, function(err, feedback){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, feedback);

    });

  },
  delete: function(params, callback){
    Feedback.remove(params, function(err, feedback){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, feedback);

    });
  }

}
