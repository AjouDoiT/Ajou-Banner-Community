/**
 * Created by ss on 2016-08-15.
 */

var db = require('mongoose');
var Schema = db.Schema;
var locationSchema = new Schema({
    location_id: {type:String, required: true},
    latitude:	{type: Number, required: true},
    longitude:   {type: Number, required: true},
    title:       {type: String, required: true},
    info:       {type: String, required: true}
});

module.exports= db.model('locations',locationSchema);
