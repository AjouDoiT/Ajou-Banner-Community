/**
 * 
 */
var db = require('./db.js'),
    Post = db.model('Post', {
    	_id:	{type: String, required: true},
        username:   {type: String, required: true},
        body:       {type: String, required: true},
        date:       {type: Date, required: true, default: Date.now()}
    });
 
module.exports= Post;
