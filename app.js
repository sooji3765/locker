var express = require("express");
var bodyParser = require('body-parser');
//var morgan = require('morgan');
const config = require('./config/config');

app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('jwt-secret', config.jwt_secret)

app.use('/', require('./controller/map'));
app.use('/auth', require('./controller/auth'));
app.use('/user', require('./controller/user'));
app.use('/keeper', require('./controller/keeper'));
app.use('/reservation', require('./controller/reservation'));
app.use('/account', require('./controller/account'));
app.use('/mypage', require('./controller/mypage'));
//app.use('/contract', require('./controller/contract.js'));

app.get('/chat', (req, res) => {
  res.render("chat");
});

io.on('connection', function (socket) {
  //console.log('a user connected');
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});
//================================================

http.listen(port);
console.log("Listening on port ", port);