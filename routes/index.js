var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.sendFile(path.resolve('views/index.html'));
=======
    res.sendFile(path.resolve('views/index.html'));
>>>>>>> 0a1abee8d98804742a40ae3b652ad5efe73a51d9
});

module.exports = router;
