var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');
var connection = require('./config/database');
const config = require('./config/config');

app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('jwt-secret', config.jwt_secret)

app.use('/auth', require('./controller/auth'));
app.use('/user', require('./controller/user'));
app.use('/keeper', require('./controller/keeper'));
app.use('/reservation', require('./controller/reservation'));
app.use('/account', require('./controller/account'));
app.use('/chat', require('./controller/chat'));
app.use('/', require('./controller/auth'));
//app.use('/contract', require('./controller/contract.js'));

app.get('/', (req, res) => {
    res.render('index');
});

//황세웅 추가부분 시작
app.get('/main', function(req, res){
    connection.query('SELECT * from prac', function(err, results) {
      if (err) throw err;
      res.render('main',{user : results});
    });
  });

  app.get('/getMarker', function(req, res){
    connection.query('SELECT * from prac', function(err, results) {
      if (err) throw err;
      res.json(results);
    });
  });
//황세웅 추가부분 끝

app.listen(port);
console.log("Listening on port ", port);