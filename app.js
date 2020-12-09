const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const { join } = require('path');

const mongoose = require('mongoose');
const uuid = require('uuid');

const { json, urlencoded } = express;

var app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;

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
// app.use(express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'client', 'build')));
// app.use(express.static(path.join(__dirname, 'client', 'build')));

//Routes
app.use('/conversation', require('./routes/conversation'));
app.use('/user', require('./routes/user'));
app.use('/invitation', require('./routes/invitation'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(req.app.get('env'), err.message);
  res.locals.error = req.app.get('env') == 'development' ? err : {};
  console.log('error', err);
  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

//SOCKET.IO CODE
io.on('connection', (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log('new client connected');
  socket.emit('connection', null);

  socket.on('join', (room) => {
    if (room) console.log(`Joining room ${room}`);
    if (!room) {
      room = uuid.v4();
    }
    socket.join(room);
  });

  socket.on('messageToClient', (msgData) => {
    console.log('msgData:', msgData);

    socket.to(msgData.room).emit('messageFromServer', msgData); // other person's message
    socket.emit('messageFromServer', msgData); // your message
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

module.exports = app;
