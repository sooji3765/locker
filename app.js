var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');
var connection = require('./config/database');

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

app.use('/auth', require('./controller/auth'));
app.use('/user', require('./controller/user'));
app.use('/keeper', require('./controller/keeper'));
app.use('/reservation', require('./controller/reservation'));
app.use('/account', require('./controller/account'));
app.use('/', require('./controller/auth'));
app.use('/contract', require('./controller/contract.js'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port);
console.log("Listening on port ", port);