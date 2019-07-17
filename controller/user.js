const router = require('express').Router();
var jwt = require('jsonwebtoken');
const mysql = require('mysql');

const auth = require('./authcheck');
var connection = require('../config/database');

router.get('/myPage', (req,res) => {
  res.render('myPage');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;
  const secret = req.app.get('jwt-secret');

  var query = "SELECT * FROM user WHERE email =  ?";

  connection.query(query, [email], function (error, results) {
    console.log(results[0]);
    if (results[0].password == password) {
      jwt.sign({
          userName: results[0].name,
          userId: results[0].id,
          email: results[0].email
        },
        secret, {
          expiresIn: '1d',
          issuer: 'fintech.admin',
          subject: 'user.login.info'
        },
        (err, token) => {
          //if (err) reject(err);
          console.log('로그인 성공', token)
          //resolve(token);
          res.json(token)
        }
      )
    } else {
      console.log('password가 맞지 않습니다.');
      onError('password가 맞지 않습니다.');
    }
  });

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: error.message
    })
  }

});

router.get('/authcheck', auth, function (req, res) {
  res.json(req.decoded);
});
// router.get('/authcheck', (req, res) => {
//   // read the token from header or url 
//   const token = req.headers['x-access-token'] || req.query.token

//   // token does not exist
//   if(!token) {
//       return res.status(403).json({
//           success: false,
//           message: 'not logged in'
//       })
//   }

//   // create a promise that decodes the token
//   const p = new Promise(
//       (resolve, reject) => {
//           jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
//               if(err) reject(err)
//               resolve(decoded)
//           })
//       }
//   )

//   // if token is valid, it will respond with its info
//   const respond = (token) => {
//       res.json({
//           success: true,
//           info: token
//       })
//   }

//   // if it has failed to verify, it will return an error message
//   const onError = (error) => {
//       res.status(403).json({
//           success: false,
//           message: error.message
//       })
//   }

//   // process the promise
//   p.then(respond).catch(onError)
// });

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/join', (req, res) => {

  const {
    name,
    email,
    password,
    accessToken,
    refreshToken,
    userseqnum
  } = req.body;

  var query = "INSERT INTO fintech.user (name, email, password, access_token, refresh_token, finusernum) VALUES (?, ?, ?, ?, ?, ?);";

  connection.query(query, [name, email, password, accessToken, refreshToken, userseqnum], function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.json(1);
    }
  });
});

router.get('/list', auth, (req, res) => {
  console.log('session : ' + req.session);
  connection.query('SELECT * FROM user', function (error, results) {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;