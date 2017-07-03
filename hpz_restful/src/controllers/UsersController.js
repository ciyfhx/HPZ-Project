var Users = require('../models/Users.js');

module.exports = {
  find: function(params, callback){
    Users.find(params, function(err, users){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, users);
    });
  },
  findOne: function(params, callback){
    Users.findOne(params, function(err, user){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, user);
    });
  },

  findById: function(id, callback){
    Users.findById(id, function(err, user){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, user);
    });

  },
  create: function(params, callback){
     Users.create(params, function(err, user){
       if(err){
         callback(err, null);
         return;
       }
       callback(null, user);

     });
  },
  update: function(){
    Users.findByIdAndUpdate(id, params, {new:true}, function(err, user){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, user);

    });
  },
  destroy: function(){

  }

}
''
