const router = require('express').Router();
var jwt = require('jsonwebtoken');
const mysql = require('mysql');

const auth = require('./authcheck');
var connection   = require('../config/database');

router.get('/', (req,res) => {
  res.render('myPage');
});


module.exports = router; 