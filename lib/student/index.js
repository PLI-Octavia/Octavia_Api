var express = require('express');
var app = module.exports = express();

var model = require('./model');

app.get('/:user_id', model.getStudent);
app.get('', model.getStudentForCourse);
app.post('/:user_id', model.updateStudent);
