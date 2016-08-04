/**
 * Created by ss on 7/30/2016.
 *  db.js contains logic that handles basic database connection
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ABCproject');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
	console.log("MongoDB successfully connected.");
});
