var createError = require('http-errors');
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cron = require("node-cron");

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scrapeRouter = require('./routes/scrape');
var db = require('./models');

var cors = require('cors');
var app = express();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.!e11');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  extname: '.hbs',
  partialsDir: [
    path.join(__dirname, 'views/email/partials/')
  ]
});

app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/scrape', scrapeRouter);

const deals = require("./jobs/deals");

//schedule tasks to be run on the server
cron.schedule("* */6 * * *", function() {
  deals.DailyDeal();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
