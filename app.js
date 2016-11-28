// requires
var express = require('express');
var promise = require('bluebird');
var bcrypt = require('bcrypt');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');

// salt
var saltRounds = 10;

// app
var app = express();

// db
var options = {
	promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:postgres@localhost:5432/octavia';
var db = pgp(connectionString);

var corsOptions = {
  origin: function(origin, callback){
    callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session
app.use(session({
  secret: 'octavia',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
}))

app.use(function (req, res, next) {
	req.db = db;
	req.bcrypt = bcrypt;
	req.saltRounds = saltRounds;
	next();
});

// routes
app.use('/login', require('./lib/login'));
app.use('', require('./lib/signup'));
app.use('/course', require('./lib/course'));
app.use('/score', require('./lib/score'));
app.use('/student', require('./lib/student'));
app.use('/game', require('./lib/game'));

app.use(express.static('./public'));
app.listen(80);
console.log("listening on port 80");
