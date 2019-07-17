const request = require('request');
const router = require('express').Router();
const mysql = require('mysql');

var connection = require('../config/database');
var config = require('../config/config');

router.get('/callback', (req, res) => {
    var authcode = req.query.code;
    var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token";

    var option = {
        method: "POST",
        url: getTokenUrl,
        headers: {

        },
        form: {
            code: authcode,
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: config.redirect_uri,
            grant_type: "authorization_code"
        },
    };
    request(option, (err, response, body) => {
        if (err) {
            console.error(err);
            throw err;
        } else {
            console.log(body);
            var accessRequestResult = JSON.parse(body);
            console.log(accessRequestResult);
            res.render('resultChild', {
                data: accessRequestResult
            })
        }
    });
});

module.exports = router;