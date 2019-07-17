const router = require('express').Router();
var jwt = require('jsonwebtoken');

const auth = require('./authcheck');
var connection = require('../config/database');

//황세웅 추가부분 시작
router.get('/', function(req, res){
  connection.query('SELECT * from user', function(err, results) {
    if (err) throw err;
    res.render('main',{user : results});
  });
});

router.get('/getMarker', function(req, res){
  connection.query('select k.id, k.user_id, k.name, k.address, keeper_phone,k.insurance, k.location_lat,k.location_lon, u.email '+
  'from keeper k join user u '+
  'on k.user_id = u.id;'
  ,function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});
//황세웅 추가부분 끝

module.exports = router;