var express = require('express');
var app = module.exports = express();

var model = require('./model');

app.get('', model.getCourse);