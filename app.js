var express = require("express");
var request = require('request');

var connection   = require('./config/database');

app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/auth', require('./controller/auth'));
app.use('/user', require('./controller/user'));
app.use('/account', require('./controller/account'));
app.use('/contract', require('./controller/contract.js'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port);
console.log("Listening on port ", port);
