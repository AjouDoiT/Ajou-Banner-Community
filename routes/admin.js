/**
 * Created by credt on 2016-08-15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin');
});
