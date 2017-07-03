var express = require('express');
var path = require ('path');

var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./config');

var api = require('./routes/api');

mongoose.connect('mongodb://localhost/bookings', function(err, res){
  if(err){
    console.log('Error Connecting to mongodb');
  }else{
    console.log('Connected to mongodb');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(session({secret:config.secret, saveUninitialized: true,resave:false}))

app.use('/api', api);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Error Message: \n" + res.locals.message);

  // render the error page
  res.status(err.status || 500);
  res.send('Nothing to see here :)');
});

app.listen(3001, function(){console.log("Server running")});
