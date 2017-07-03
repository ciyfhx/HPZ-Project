var Resource = require('../models/Resource.js');

module.exports = {
  find: function(params, callback){
    Resource.find(params, function(err, resource){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, resource);
    });
  },
  findById: function(id, callback){
    Resource.findById(id, function(err, resource){
      if(err){
        callback(err, null);
        return;
      }
      callback(null, resource);
    });

  },
  create: function(params, callback){
     Resource.create(params, function(err, resource){
       if(err){
         callback(err, null);
         return;
       }
       callback(null, resource);

     });
  },
  update: function(){

  },
  destroy: function(){

  }

}
''
