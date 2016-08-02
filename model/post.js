/**
 * 
 */
var db = require('./db.js');
var Schema = db.Schema;
var postSchema = new Schema({
    	uid:	{type: String, required: true},
        username:   {type: String, required: true},
        body:       {type: String, required: true},
        date:       {type: Date, required: true, default: Date.now()}
    });
 
module.exports= mongoose.model('post',postSchema);
