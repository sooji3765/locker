const router = require('express').Router();
var jwt = require('jsonwebtoken');
const mysql = require('mysql');

var connection   = require('../config/database');

router.post('/login', (req, res) => {
  const {email, password} = req.body;

  var query = "SELECT * FROM user WHERE email =  ?";
  
  connection.query(query, [email], function (error, results) {
    if(results[0].password == password){
      jwt.sign(
        {
          userName : results[0].name,
          userId : results[0].id
        },
        "fintechKey",
        {
          expiresIn : '1d',
          issuer : 'fintech.admin',
          subject : 'user.login.info'
        },
        function(err, token){
          console.log('로그인 성공', token)
          res.json(token)
        }
      )
    }
  }); 
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/join', (req, res) => {

  const {name, email, password, accessToken, refreshToken, userseqnum} = req.body;

  var query = "INSERT INTO fintech.user (name, email, password, access_token, refresh_token, finusernum) VALUES (?, ?, ?, ?, ?, ?);";

  connection.query(query, [name, email, password, accessToken, refreshToken, userseqnum], function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.json(1);
    }
  });
});

router.get('/list', (req, res) => {
  connection.query('SELECT * FROM user', function (error, results) {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router; 