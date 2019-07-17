const router = require('express').Router();
var http = require('http').createServer(app);
var sessionstorage = require('sessionstorage');
var io = require('socket.io')(http);

const mysql = require('mysql');
const auth = require('./authcheck');

router.get('/', (req, res) => {
  console.log(sessionstorage.getItem('jwtToken'));
  res.set({'x-access-token':  sessionstorage.getItem('jwtToken')});
  res.render("chat");
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});


module.exports = router; 