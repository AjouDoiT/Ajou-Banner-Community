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
router.delete('/location', function (req, res, next){
    Location.find({_id : req.query._id}).remove(function (data){
        res.status(201).json(data);
    })
});
router.post('/location', function (req, res, next) {
    var location = new Location({
        location_id:  req.body.location_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        title:    req.body.title,
        info:   req.body.info
    }); // create post using Post model from models/posts.js

    location.save(function (err, data) {
        if (err) {
            return next(err)
        } // in event-oriented lang like node,
        // exception handling is hard to handle. So express uses next
        // design next like above code.
        res.status(201).json(data);
        // it dose not have to return 'post' json, but this is preferred when
        // app needs server-generated data like _id field or Date.
    }) 
});
router.get('/', function (req, res, next) {
    res.render('admin');
});

module.exports = router;