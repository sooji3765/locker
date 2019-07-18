var express = require('express');
var router = express.Router();
var eth = require('../config/eth.js');

//----------------------------
//  get message
//----------------------------
router.get('/message', function(req, res) {
  var message = eth.getMessage();
  console.log("message : " + message);
  res.end(message);
});

//----------------------------
//  set message
//----------------------------
router.get('/setmessage', function(req, res) {
  var message = eth.getMessage();
  var total_price = req.query.total_price;

  res.render('contract',{data:message, total_price:total_price});
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

router.post('/sendTransaction', function(req, res) {

  //from : 0x3bbb90ee2bbd6536aa9a79bc9ee235ac6801b373
  //to: 0x68b7850de5c7cf864fc3bd31068d5cff02eac8d5

  const {ether, fromAddr, toAddr, passphase} = req.body;

  console.log("fromAddr----->>>>>: " + fromAddr);


  eth.unlockAccount(fromAddr, passphase, checkUnlock);

  function checkUnlock(err, result) {
      console.log("checkUnlock-----");
      if (err) {
          console.log(err);
          return callback(err);
      } else {
          eth.sendTransaction(fromAddr, toAddr, ether, 2000000, checkTransaction);
      }
  }

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
