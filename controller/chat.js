const router = require('express').Router();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const mysql = require('mysql');
const auth = require('./authcheck');

router.get('/', (req, res) => {
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