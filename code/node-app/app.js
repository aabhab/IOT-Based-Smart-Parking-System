var createError = require('http-errors');
require('./db/mongoose')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var slotsRouter = require('./routes/slots');
var cors = require('cors')

var app = express();

// view engine setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/slots', slotsRouter);
app.use('/users', usersRouter);

app.listen(8080, function() {
	console.log('Express server listening on port ' + 8080);
});



module.exports = app;
