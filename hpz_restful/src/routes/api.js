var express = require('express');
var router = express.Router();
var BookingController = require('../controllers/BookingController');
var ResourceController = require('../controllers/ResourceController');
var UsersController = require('../controllers/UsersController');
var FeedbackController = require('../controllers/FeedbackController')

var jwt = require('jsonwebtoken')
var config = require('../config.js')
var validations = require('../common/Validations');

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://cxa17-open63.sensorup.com', {clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8), username:"main", password:"2e0f6e48-ed36-5087-b4a2-c95c07bc2a48"})

client.on('connect', function () {
  //client.subscribe("test")
  console.log("Connected to mqtt server")
})

client.on('message', function (topic, message) {
  console.log(message.toString())
})

function checkPrivilege(privilege, requiredPrivilegeLevel, res) {
  if (privilege >= requiredPrivilegeLevel) {
    return true;
  } else {
    res.json({
      status: "failed",
      result: 'Access not permitted or elevated'
    })
    return false;
  }
}

var authMiddleware = function(req, res, next) {


  var token = req.get("Authorization"); //WARNING: Not secure

  if (token) {
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        return res.json({
          status: "failed",
          result: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        console.log(req.decoded)
        next();
      }
    });

  } else {

    return res.status(403).redirect('/');

  }
}



router.get('/:resource', authMiddleware, function(req, res, next) {
  var resource = req.params.resource;

  if (resource == 'bookings') {
    BookingController.find(req.query, function(err, result) {
      if (err) {
        res.json({
          status: 'fail',
          result: err
        });
        return
      }
      res.json({
        status: 'success',
        result: result
      });
    });
  } else if (resource == 'resources') {
    ResourceController.find(req.query, function(err, result) {
      if (err) {
        res.json({
          status: 'fail',
          result: err
        });
        return
      }
      res.json({
        status: 'success',
        result: result
      });
    });
  }



});


router.get("/:resource/:id", authMiddleware, function(req, res, next) {
    var resource = req.params.resource;
    var id = req.params.id;
    if (resource == 'bookings') {
      BookingController.findById(id, function(err, result) {
        if (err) {
          res.json({
            status: 'fail',
            result: 'Not Found'
          });
          return;
        }
        res.json({
          status: 'success',
          result: result
        });

      });
    } else if (resource == 'resource-bookings') {
      BookingController.find({
        resourceId: id
      }, function(err, result) {
        if (err) {
          res.json({
            status: 'fail',
            result: 'Not Found'
          });
          return;
        }
        res.json({
          status: 'success',
          result: result
        });
      })

    } else if (resource == 'cancel-book') {
      BookingController.delete({_id: id},
      function(err, result) {
        if (err) {
          res.json({
            status: 'fail',
            result: err
          });
          return;
        }
        res.json({
          status: 'success',
          result: result
        });
      }
      );
    }

});


router.post("/:resource", function(req, res, next) {
  var resource = req.params.resource;
  if (resource == 'book') {
    BookingController.create(req.body, function(err, result) {
      if (err) {
        res.json({
          status: 'fail',
          result: err
        });
        return;
      }
      console.log(req.body)
      client.publish('others/booking', "test")
      res.json({
        status: 'success',
        result: result
      });
    });
  } else if (resource == 'users') {
    UsersController.create(req.body, function(err, result) {
      if (err) {
        res.json({
          status: 'fail',
          result: err
        });
        return;
      }
      res.json({
        status: 'success',
        result: result
      });
    });
  } else if (resource == 'login') {
    var loginData = req.body;
    var validated = validations.validateInputLogin(loginData);
    var errors = validated.errors;
    var isValid = validated.isValid;
    if (!isValid) {
      res.status(400).json(errors);
      return;
    } else {

      UsersController.findOne({
        username: loginData.username,
        password: loginData.password
      }, function(err, result) {
        if (err || !result) {
          res.status(400).json({
            unableToLogin: 'Unable to login'
          });
          return;
        }
        var token = jwt.sign({
          id: result._id,
          username: result.username,
          privilege: result.privilege
        }, config.jwtSecret)
        res.json({
          status: 'success',
          token: token,
        });
      });
    }

  }else if(resource == 'feedback'){
    var feedbackMsg = req.body.message;
    console.log(feedbackMsg)
    FeedbackController.create({message: feedbackMsg}, function(err, result){
      if (err) {
        res.json({
          status: 'fail',
          result: err
        });
        return;
      }
      res.json({
        status: 'success',
        result: result
      });
    });
  } else {
    next();
  }
});

router.post('/create-user', authMiddleware, function(req, res, next) {
  if (checkPrivilege(req.decoded.privilege, 1, res)) {
    var createUserData = req.body;
    var validated = validations.validateInputCreateUser(createUserData);
    var errors = validated.errors;
    var isValid = validated.isValid;
    if (!isValid) {
      res.status(400).json(errors);
      return;
    } else {
      var newcreateUserData = {
        username: createUserData.username,
        password: createUserData.password,
        privilege: createUserData.privilege
      }
      UsersController.create(newcreateUserData, function(err, user) {
        console.log(err)
        if (err) {
          res.status(400).json({
            status: 'fail',
            result: 'Unable to create user',
          });
          return;
        }
        res.json({
          status: 'success',
          result: 'Successfully created user account'
        });
      })
    }
  }
})


module.exports = router
