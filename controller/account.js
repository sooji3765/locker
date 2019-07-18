const request = require('request');
const router = require('express').Router()
const mysql = require('mysql');

var connection = require('../config/database');

router.post('/search', (req, res) => {
    userseqnum = req.body.userseqnum;
    accessToken = req.body.accessToken;
    var user_id = req.body.user_id;
    var url = "https://testapi.open-platform.or.kr/user/me?user_seq_no=" + userseqnum;

    var option = {
        method: "GET",
        url: url,
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    };
    request(option, (err, response, body) => {
        if (err) {
            console.error(err);
            throw err;
        } else {
            var accountResult = JSON.parse(body);
            console.log(accountResult);
            var fintech_use_num = accountResult.res_list[0].fintech_use_num;
            console.log(fintech_use_num);
            connection.query("UPDATE user SET fintech_use_num=? WHERE id =? ", [fintech_use_num, user_id],
                function (error, result) {
                    res.json(fintech_use_num);
                });
        }
    });
});

router.post('/getdb', (req, res) => {
    var user_id = req.body.userid;

    connection.query("SELECT * FROM user WHERE id=?", [user_id], function (err, results) {
        console.log(results);
        res.json(results[0]);
    });
});

router.post('/balance', (req, res) => {

    var userid = req.body.userid;
    console.log(userid);

    connection.query("SELECT * FROM user WHERE id = ?", [userid], function (error, results) {

        if (error) console.error(error);
        console.log(results);
        console.log(results[0].fintech_use_num);
        console.log(results[0].accessToken);
        fintech_use_num = results[0].fintech_use_num;
        accessToken = results[0].accessToken;
        tran_dtime = "20190719101921";

        var url = "https://testapi.open-platform.or.kr/account/balance?fintech_use_num=" + fintech_use_num + "&tran_dtime=" + tran_dtime;

        var option = {
            method: "GET",
            url: url,
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        };
        request(option, (err, response, body) => {
            if (err) {
                console.error(err);
                throw err;
            } else {
                var getBalance = JSON.parse(body);

                res.json(JSON.parse(body));
            }
        });
    });
});

router.post('/transaction_list', (req, res) => {

    var userid = req.body.userid;
    console.log(userid);
    console.log("거래내역 조회");

    connection.query("SELECT * FROM user WHERE id = ?", [userid], function (error, results) {

        if (error) console.error(error);
        console.log(results);
        console.log(results[0].fintech_use_num);
        console.log(results[0].accessToken);
        fintech_use_num = results[0].fintech_use_num;
        accessToken = results[0].accessToken;

        tran_dtime = "20190719101921";

        var qs =
            "?fintech_use_num=" + fintech_use_num + "&" +
            "inquiry_type=A&" +
            "from_date=20160404&" +
            "to_date=20160405&" +
            "sort_order=D&" +
            "page_index=1&" +
            "tran_dtime=20190712154216";
        //+ "tran_dtime=20160310101921";
        +
        "befor_inquiry_trace_info=123&" +
        "list_tran_seqno=0"

        var url = "https://testapi.open-platform.or.kr/account/transaction_list" + qs;
        var option = {
            method: "GET",
            url: url,
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        };
        request(option, (err, response, body) => {
            if (err) {
                console.error(err);
                throw err;
            } else {
                res.json(JSON.parse(body));
            }
        });
    });
});

// 출금
router.post('/transfer/withdraw', (req, res) => {
    user_id = req.body.user_id;
    var url = "https://testapi.open-platform.or.kr/transfer/withdraw";

    connection.query("SELECT * FROM user WHERE id=?", [user_id], function (error, results) {

        var accessToken = results[0].accessToken;
        var fintech_use_num = results[0].fintech_use_num;

        console.log("출금 중 :" + accessToken);
        var option = {
            method: "POST",
            url: url,
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json; charset=UTF-8",
            },
            json: {
                dps_print_content: "쇼핑몰환불",
                fintech_use_num: fintech_use_num,
                tran_amt: "10000",
                tran_dtime: "20160310101921"
            }
        };

        request(option, (err, response, body) => {
            if (err) {
                console.error(err);
                throw err;
            } else {
                res.json(body);
            }
        });
    });
});

router.post('/deleteAccount', (req, res) => {
    const fintech_use_num = req.body.fintech_use_num;
    const accessToken = req.body.accessToken;
    var url = "https://testapi.open-platform.or.kr/v1.0/account/cancel";

    var option = {
        method: "POST",
        url: url,
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json; charset=UTF-8",
        },
        json: {
            scope: 'transfer',
            fintech_use_num: fintech_use_num
        }
    };

    request(option, (err, response, body) => {
        if (err) {
            console.error(err);
            throw err;
        } else {
            res.json(body);
        }
    });
});

module.exports = router