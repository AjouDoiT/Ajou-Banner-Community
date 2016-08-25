/**
 * 
 */
var db = require('mongoose');
var Schema = db.Schema;
var postSchema = new Schema({
    	uid:	        {type: String, required: false},
        username:       {type: String, required: true},
        body:           {type: String, required: true},
        date:           {type: Date, required: true, default: Date.now()},
        location_id:    {type:String, required: true}
    });
 
module.exports= db.model('post',postSchema);
