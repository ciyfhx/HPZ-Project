var Booking = require('../models/Booking.js');

module.exports = {
  find: function(params, callback){
    Booking.find(params, function(err, booking){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, booking);
    });
  },
  findById: function(id, callback){
    Booking.findById(id, function(err, booking){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, booking);
    });

  },
  create: function(params, callback){
     Booking.create(params, function(err, booking){
       if(err){
         callback(err, null);
         return;
       }
       callback(null, booking);

     });
  },
  update: function(id, params, callback){
    Booking.findByIdAndUpdate(id, params, {new:true}, function(err, booking){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, booking);

    });

  },
  delete: function(){

  }

}
