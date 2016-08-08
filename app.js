var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();	


var mongoose = require('mongoose');
var Post = require('./model/post');
var dbroutes = require('./routes/db')(app,Post);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * we will (temporally) use raw html file by sendfile method .
 * by credtiger96
 */

// we have to make favicon
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
/**
 * DataBase HANDLING
 */


/*mongoose.createConnection('mongodb://aws.lkaybob.pe.kr/ABCproject',function (err){
    if(err) {
        console.log('MongoDB connection error. ' + err);
        return;
    }
    console.log("MongoDB connection is successfully created.")
});*/
mongoose.connect('mongodb://aws.lkaybob.pe.kr/ABCproject');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
	console.log("mongo db connection ok.");
});

var user1 = new Post({uid: '123456', username: 'Sungsoo Ahn', body: 'Hi friends'});
console.log(user1.date);
user1.save();

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
    res.sendFile(path.resolve('views/error.html'));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.sendFile(path.resolve('views/error.html'));
});


module.exports = app;
