var express = require('express');
var app = module.exports = express();

var model = require('./model');

app.post('/teacher', model.signupAsTeacher);
app.post('/student', model.signupAsStudent);