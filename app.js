const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');
// JWT secret key
const config = require('./config');



const app = express();
// DB connection
const db = require('./helpers/db.js')();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// jwt key set
app.set('api_secret_key',config.api_secret_key);
//Middleware
const verifyToken = require('./middleware/verify-token');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//JWT TOKEN Middleware access
app.use('/api',verifyToken);
//Movie Route
app.use('/api/movies', movie);
//Director Route
app.use('/api/directors', director);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // manage error => go to movie.js file
  res.json({ error : {message : err.message , code : err.code} });
});

module.exports = app;
