const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');

const { json, urlencoded } = express;

//Routes

var app = express();

//connect mongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Team Cocoa Puffs's MongoDB Connected!");
  } catch (err) {
    console.error(err.message);

    //Exit process with failure
    process.exit(1);
  }
};
connectDB();

app.use(logger('dev'));
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// app.use("/", require("./routes/index"));
app.use('/user', require('./routes/user'));
app.use('/invitation', require('./routes/invitation'));
app.use('/conversation', require('./routes/conversation'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(req.app.get('env'), err.message);
  res.locals.error = req.app.get('env') == 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(3001, () => {
  console.log('Server has started...');
});

module.exports = app;
