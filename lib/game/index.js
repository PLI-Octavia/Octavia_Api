var express = require('express');
var app = module.exports = express();

var model = require('./model');

app.get('/:course_id', model.getGame);
app.get('', model.getGameFromSession);
app.post('/:game_id/toggle/', model.toggle);
