var express = require('express');
var app = module.exports = express();

var model = require('./model');

app.post('/teacher', model.loginAsTeacher);
app.post('/student', model.loginAsStudent);