'use strict';
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const HttpError = require('./error').HttpError;
const config = require('./config');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const api = require('./routes/api');
const passport = require('passport')
const initPassport = require('./lib/authentication');
const checkBlackList = require('./lib/checkBlackList')

// Set up middleware
const requireAuth = passport.authenticate('jwt', { session: false });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
initPassport(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', requireAuth, checkBlackList, api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  console.log('handle ' + err);
  if (typeof err === 'number') {
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  }
  else {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
});

module.exports = app;
