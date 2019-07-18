const request = require('request');
const router = require('express').Router();
const mysql = require('mysql');

var connection = require('../config/database');
var config = require('../config/config');
var session = require('sessionstorage');




router.get('/callback', (req, res) => {
    var authcode = req.query.code;
    var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token";

    // 수정 필요 : userid를 commons.js 에서 가져오는 방법
    var userId = session.getItem("userId");

    console.log("userid=========>" + userId);
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

            var accessRequestResult = JSON.parse(body);
            console.log(accessRequestResult);
            var accessToken = accessRequestResult.access_token;

            var refreshToken = accessRequestResult.refresh_token;
            var finusernum = accessRequestResult.user_seq_no;
            var sql = "UPDATE user SET accessToken =? , refreshToken=?, finusernum=? WHERE id=?"
            connection.query(sql, [accessToken, refreshToken, finusernum, user_id],
                function (err, result) {
                    res.render('resultChild', {
                        data: accessRequestResult
                    });
                });
        }
    });
});

module.exports = router;