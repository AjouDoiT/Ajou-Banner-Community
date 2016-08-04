/**
 * Created by ss on 7/30/2016.
 *  db.js contains logic that handles basic database connection
 */
//var dbschema=require('/model/post')
var mongoose = require('mongoose');
var db=mongoose.connection;
db.on('error',console.err);
db.once('open',function() {
	//app.use(dbschema);
});
mongoose.connect('mongodb://localhost:27017/ABCproject');


