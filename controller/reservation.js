const router = require('express').Router();
var jwt = require('jsonwebtoken');


var connection = require('../config/database');


router.get('/register/:id', (req, res) => {
    const keeper_id = parseInt(req.params.id);
    console.log(keeper_id);
    res.render('register', {
        keeper_id: keeper_id
    });
});

router.post('/check', (req, res) => {
    const {
        keeper_id,
        user_id,
        total_price,
        product_amount,
        cntVal,
        cntVal2,
        reservation_start_date,
        reservation_end_date,
        insurance_flag,
        pay_state
    } = req.body;

    console.log(req.body);


    var sql = "INSERT INTO locker.reservation_info(keeper_id,user_id,reservation_start_date,reservation_end_date" +
        " ,insurance_flag, product_amount,total_price,pay_state) " +
        "values(?,?,?,?,?,?,?,?)";

    connection.query(sql, [keeper_id, user_id, reservation_start_date,
        reservation_end_date, insurance_flag,
        product_amount, total_price, pay_state
    ], function (err, results) {

        if (err) console.error(err);

        console.log(results[0]);

        var result = {
            "data": 1
        }

        if (pay_state == 1) res.json(result); // block_chain

        else {
            var sql2 = "select id from locker.reservation_info where user_id=? " +
                " order by id desc" +
                " limit 1";
            connection.query(sql2, [user_id], function (error, row) {
                if (error) console.error(error);

                console.log(row);
                var reservation_id = row[0].id;
                console.log(reservation_id);
                result = {
                    "data": 2,
                    "reservation_id": reservation_id
                };
                res.json(result);
            });
        }
    });
});

router.get('/pay/:id', (req, res) => {
    const reservation_id = req.params.id;
    res.render('account', {
        reservation_id: reservation_id
    });
});

router.get('/info/:id', (req, res) => {
    var reservation_id = req.params.id;

    var sql = "select r.id, r.keeper_id, r.user_id,r.reservation_start_date, r.reservation_end_date, r.cancel_flag, r.insurance_flag, r.product_amount,r.total_price," +
        " r.pay_state,k.name,k.address,k.keeper_phone,k.location_lat,k.location_lon" +
        " from locker.reservation_info r join locker.keeper k" +
        " on r.keeper_id = k.id" +
        " where r.id = ?;";

    connection.query(sql, [reservation_id], function (err, results) {
        if (err) console.error(err);
        console.log(results);
        res.render('reservation_info', {
            list: results[0]
        });
    });
});

router.get('/list', (req, res) => {
    var user_id = 1;
    var sql = "SELECT r.id, r.keeper_id, r.user_id, k.name, r.cancel_flag, r.reservation_start_date, r.reservation_end_date " +
        "FROM locker.reservation_info r join locker.keeper k " +
        "on r.keeper_id = k.id " +
        "WHERE r.user_id =?"

    connection.query(sql, [user_id], function (err, results) {
        if (err) console.error(err);

        console.log(results);
        res.render('reservation_list', {
            list: results
        });
    });
});


module.exports = router;