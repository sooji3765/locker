const router = require('express').Router();
var jwt = require('jsonwebtoken');

var session = require('sessionstorage');
var connection = require('../config/database');


router.get('/store/:id', (req, res) => {
    const keeperId = parseInt(req.params.id);
    console.log("keeper Id :" + keeperId);

    if (!keeperId) {
        return res.status(400).json({
            error: 'Incorrect ID'
        });
    }

    var sql1 = "SELECT * FROM keeper WHERE id =?";

    connection.query(sql1, [keeperId], function (err, row) {

        if (err) console.error(err);
        console.log(row);

        var sql2 = "SELECT r.id, r.reservation_id, r.keeper_id, r.score, r.comment, r.create_date , u.name as username " +
            "FROM review r JOIN user u ON r.user_id = u.id WHERE r.keeper_id =?"
        connection.query(sql2, [keeperId], function (err, results) {
            if (err) console.error(err);

            console.log(results);
            res.render('store', {
                keeper: row[0],
                review: results
            });
        });
    });
});

router.get('/review_write/:id', (req, res) => {
    const reservation_id = req.params.id;
    res.render('review_write');
});

router.post('/review_submit', (req, res) => {
    const {
        reservation_id,
        comment
    } = req.body;

    connection.query("SELECT keeper_id FROM reservation_info WHERE id=?", [reservation_id],
        function (err, results) {
            if (err) console.error(err);
            console.log(results);
            var keeper_id = results[0].keeper_id;
            var score = 4.5;
            var user_id = 1;
            var sql = "INSERT INTO review(reservation_id, keeper_id, user_id, score, comment)" +
                " VALUES(?, ?, ?, ?, ?)";
            connection.query(sql, [reservation_id, keeper_id, user_id, score, comment],
                function (error, row) {
                    if (error) console.error(error);
                    console.log(1);

                    res.redirect('/keeper/store/' + keeper_id);
                });
        });
});

router.get('/register_keeper',function(req,res){
    res.render('register_keeper');
});

router.get('/keeperList',function(req,res){
    res.render('keeperList');
});

router.get('/keeperManagement',function(req,res){
    res.render('keeperManagement');
});

router.post('/reg_keep_ok', (req, res) => {

    const {
      name,
      address,
      keeper_phone,
      insurance,
      location_lat,
      location_lon
    } = req.body;
  
    var userId = session.getItem("userId");
  
    var query = "INSERT INTO keeper (user_id, name, address, keeper_phone, insurance, location_lat, location_lon) VALUES (?, ?, ?, ?, ?, ?, ?);";
      connection.query(query, [userId, name, address, keeper_phone, insurance, location_lat, location_lon], function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.json("ok");
      }
    });
  });

module.exports = router;