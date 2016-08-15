/**
 * Created by credt on 2016-08-15.
 */
var express = require('express');
var router = express.Router();
var Location = require('../model/location');

router.get('/location', function (req, res, next){
    Location.find()
    // this returns whole post array
    // from posts collection in our database
        .exec(function (err, data) {
            if (err) {
                return next(err)
            }
            res.json(data);
        });
});
var toObjectSource = function(obj)   {
    if(obj === null)   {
        return "[null]";
    }
    if(obj === undefined) {
        return "[undefined]";
    }

    var str = "[";
    var member = null;
    for(var each in obj)   {
        try   {
            member = obj[each];
            str += each + "=" + member + ", ";
        }catch(err) {
            alert(err);
        }
    }
    return str + "]";
}
router.post('/location', function (req, res, next) {

    var location = new Location({
        location_id:  req.body.location_id  ,
        latitude: req.body.location_lat,
        longitude: req.body.location_lng,
        title:    req.body.location_title,
        info:   req.body.location_info
    }); // create post using Post model from models/posts.js

    location.save(function (err, data) {
        if (err) {
            return next(err)
        } // in event-oriented lang like node,
        // exception handling is hard to handle. So express uses next
        // design next like above code.
        res.json(201, data);
        // it dose not have to return 'post' json, but this is preferred when
        // app needs server-generated data like _id field or Date.
    })
});
router.get('/', function (req, res, next) {
    res.render('admin');
});


module.exports = router;