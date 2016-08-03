var express = require('express');
var path = require('path');
var firebase = require('firebase');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('views/custom_sample.html'));
});

// Receiving JWT Token through POST Method
router.post('/data', function(req, res,next){
	res.send('Login Successful');
	console.log(res.json(req.body));
});

module.exports = router;