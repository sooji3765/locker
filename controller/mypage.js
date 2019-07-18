const router = require('express').Router();
var jwt = require('jsonwebtoken');

var connection   = require('../config/database');

router.get('/', (req,res) => {
  res.render('myPage');
});


module.exports = router; 