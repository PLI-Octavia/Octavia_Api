var express = require('express');
var app = module.exports = express();

var model = require('./model');

app.get('/student/:user_id', model.getScore);
app.post('/student', model.postScore);
