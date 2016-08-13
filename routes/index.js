var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var firebase = require('firebase');
var router = express.Router();

/*
 * Service Account information needed to
 * access Firebase Project remotely
 * on custom server by. lkaybob
 */

firebase.initializeApp({
	serviceAccount : './AjouBannerCom-3be5df8358af.json',
	databaseURL: "https://ajoubannercom.firebaseio.com"
});

/* GET layout  page. */
router.get('/banner', function (req, res, next){
    res.render('banner');
});

router.get('/map',function (req, res, next) {
    res.render('map');
});

router.get('/main', function (req, res, next){
    res.render('main');
});

/* GET layout  page. */
router.get('/', function(req, res, next) {
    res.render('layout')
});

/**
* --- Firebase Token Middleware Example ---
* ./public/app.js와 함께 참고바람
 * 클라이언트에서 보낸 POST 요청의 내용 중
 * jwt만 firebase verifyIdToken 미들웨어를 거쳐서
 * decodedToken을 받는다.
 */
router.post('/send', function(req,res){
    console.log(req.body);
    firebase.auth().verifyIdToken(req.body.jwt).then(function(decodedToken){

        console.log(decodedToken.uid);
        console.log(decodedToken.name);
        console.log(decodedToken.picture);
        console.log(req.body.body);
    }).catch(function(error){
        console.log(req.body);
        console.log(error);
    });
});

module.exports = router;