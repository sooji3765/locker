var express = require('express');
var router = express.Router();
var eth = require('../config/eth.js');

//----------------------------
//  get message
//----------------------------
router.get('/message', function(req, res, next) {
  var message = eth.getMessage();
  console.log("message : " + message);
  res.end(message);
});

//----------------------------
//  set message
//----------------------------
router.get('/setmessage', function(req, res, next) {
  var message = eth.getMessage();
  res.render('contract',{data:message});
});

router.post('/setmessage', function(req, res, next) {
  var message = req.body.msg;

  eth.setMessage(message, 2000000, checkTransaction);

  function checkTransaction( err, result) {
    console.log("checkTransaction-----" + result);
    if(err) {
        console.log(err);
        console.log("* event trigger call - error  ");
        return callback(err);
    } else {
        console.log("* event trigger call - ok  ");
        res.json(eth.getMessage());
    }
  }
});

module.exports = router;
