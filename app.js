var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');

var routes = require('./routes/index');

var app = express();
var redirectApp = express();


var mongoose = require('mongoose');
require('./routes/db')(app);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setting Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

/*
* Body-parser should be disabled for default
* due to error on reading JWT Token
* by lkaybob
*/

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
/**
 * DataBase HANDLING
 * by. FrogAhn
 */


mongoose.connect('mongodb://aws.lkaybob.pe.kr/ABCproject');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
	console.log("mongo db connection ok.");
});

/*var user1 = new Post({uid: '123456', username: 'Sungsoo Ahn', body: 'Hi friends'});
console.log(user1.date);
user1.save();*/

/**
 * Redirects from HTTP to HTTPS
 * by. lkaybob
 */
http.createServer(redirectApp).listen(8080, function(){
    console.log('Redirect App Created');
});

redirectApp.use('*', function(req, res){
    res.redirect('https://' + req.hostname + req.path);
});
/**
 * ERROR HANDLING
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
