var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var Location = require('../model/location');
/*
 * Service Account information needed to
 * access Firebase Project remotely
 * on custom server by. lkaybob
 */

firebase.initializeApp({
	serviceAccount : {
		"project_id": "ajoubannercom",
		"private_key_id": "3be5df8358afd742ed2e11951cc81e917886c2cd",
		"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCldS2HiJi/6lry\n3RWLj4NGGxMs2IhDulIknJkQ9ldjngGFJXHTvGErOOr28ya3fgaJvDu7TforRgEo\nEjXFl84vv7+Hrb4fFcLemt0OOEo1eFDaCypD35X034i07/hqL/KOmVbApFs49xFl\nVJbwpsZGXDUpoQLGIvITJpqiNF4Ah0lUGBRlMVNUrMMeX+SjyoOZPVu/RkCqIZxZ\ns1SbkjQ4KMzDLb7JHO/FfKLYnRohDwQtijgXrozkHnky2qEwiBxpLysJ1cuSF6mv\n8UC4tKTF/YpriAI/d3t8tw7BQWqveLbVk4F2YNl3yZBwOKewZn66mVl358HWnaMU\nF7+IdGUbAgMBAAECggEAKLuON92S7Tw+o6d11GPCR5IGyHWOJk5KRqUesaRTozyU\n1zh+q0enDEL45U6661VlOqdSdSwfOGQFiN3iywAyTGMCPd6x/WkYDkFFxmhpLHyw\nOt2gzBDRE/Wr7A9fspSXPC/XwZk0s/NvHukSN7B3A39TvynaSvjza2+HhgMqWSqP\nU9IuZYOm8BmuTdKNvjqxY3UlScH/1/wg6GLjbQ/uelpRZLHYi1uvjMKM8PAzHsu2\n18K7YgsNIrIe/ZlBLkbTRtUczzxtHzVCc+dHZI/24XtVOLHmKrqD1lrSHJhEEHNE\ncxpsBOCi2se5kMYGxmUPV/5SIGYmJN0GRrgHyi24kQKBgQDgpCZwxdMJ3HVIIW2Y\nLrJ7cFXmCU2cwnilk24I1VOmKcLJYdvLNLd2JqvScRc3+hBljeUF5vHkGZSNFZnK\nq3/Ig27vzL4EcutYP4hk2I/v5cAZyceKKgvQz7ledOHj1AsDQlGV5lRv35g0iCLu\npVoHrBPRaMSeGFmrGOpUHg+XLwKBgQC8jgceqTSEf8qYCGOQpE63THAgldX2CImA\nTW4T0+Z3zligGXRErFohrYHM9BZmb795aF77V2HhePY8eENdRUdDhy0+gHHt1+RZ\nq+pgn1IQR3/xmWtwfT5/+rq42BfMBsGfzIYhhaEXcaBkPqmMSo0u6HpDkLQoCwMV\n+V0bqgdV1QKBgQCzsnvRkF3uMH1dEuiBaTF7TvRXzK9aK7Ko+NN3m3aLoDJiN7bD\nycrMZ8jg0Xh6Xb4KDsTawNBU4CWV6maY2jGg64qtpsGF+4vJjyEDUr1pcQcHWgMV\nwearxc8KAUPFpRSeKcnruFFpIJq3wwL2liz7oCpGRKGrudzY4lhoq5dbHwKBgDtH\ne72L/NLbSlpZ6NOElKrUATx9XvMm4/POZBkfuYlY+kv7NK6ScRO9dN12r8Qsxcnp\nolLquf8lBGUmeidMrIbybKsFvsvD4CrA/cK61BYCJJtUXI7VEV0y+pk6duDSDvWq\nW1EWrfqs4nwhpzRQC+r/c9DiIYGlVKcH6tnTrtKxAoGBAIjehbyr9QfhO++XTs2N\nixDzvAtUuNd6wmSEhTQXKvK0UTqNBvjEzLKE7bvpSul+TPSQP0OVHuuIrd5tOZzW\nByGOJ1CS7N7kEhv49Zpbb5lypxOPcQCfipwmH/Rs9fMWtUnNoftxo7ObR6KkMGei\nliuFnd/APkHtdFkCCa7Iy0bw\n-----END PRIVATE KEY-----\n",
		"client_email": "abcserver@ajoubannercom.iam.gserviceaccount.com",
		"client_id": "111366295933777871913",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://accounts.google.com/o/oauth2/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/abcserver%40ajoubannercom.iam.gserviceaccount.com"
	},
	databaseURL: "https://ajoubannercom.firebaseio.com"
});


/* GET layout  page. */
router.get('/', function(req, res, next) {
	res.render('layout');
});

router.get('/banner', function(req, res, next) {
	res.render('banner');
});

router.get('/map', function(req, res, next) {
    Location.find(function(err,locations){
        if(err) return res.status(500).send({error: 'Database failure'});
        res.render('map',{Locations: JSON.stringify(locations)});
    })
});

router.get('/about',function (req, res, next) {
	res.render('about');
});


/*
 * Sample Code to check idToken
 * Should invoke bodyParser manually to read
 * request payload (JWT Token).
 * If suceeded, UID in plaintext will be printed.
 * If not, error message will be printed.
 * by. lkaybob

router.post('/', bodyParser.text({ type: 'json' }), function(req, res){
    firebase.auth().verifyIdToken(req.body).then(function(decodedToken){
        var uid = decodedToken.sub;

        console.log(uid);
    }).catch(function(error){
        console.log(req.body);
        console.log(error);
    });
});
*/

module.exports = router;