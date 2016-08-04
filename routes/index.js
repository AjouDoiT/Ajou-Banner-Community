var express = require('express');
var router = express.Router();

router.get('/banner', function (req, res, next){
  res.render('banner');
});
router.get('/main', function (req, res, next){
  res.render('main');
});


/* GET layout  page. */
router.get('/', function(req, res, next) {
  res.render('layout')
});

module.exports = router;
