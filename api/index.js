/* eslint-disable no-console */
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config({ path: '../.env' });

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

const { checkAuth, socketAuth } = require('./middleware/auth.js');

//=============== DB ================
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect(`mongodb://127.0.0.1:27017/InquireHub`)
  .then(() => console.log(`Connected to MongoDB`));

//============== Socket =============
const fileRegex = /\.\/events\/(?<cmd>\w+)\.js/g;
const { Glob } = require('glob');
const eventPaths = new Glob('./events/*.js', {});

io.use(socketAuth);

io.on('connection', (socket) => {
  // socket.onAny((eventName, ...args) => {
  //   console.log('[ALL] ', eventName, args);
  // });

  for (const file of eventPaths.found) {
    let eventFile = file.replace(fileRegex, '$<cmd>'); 

    socket.on(eventFile, (...args) => {
      require(`./${file}`)({ io, socket }, ...args);
    });
  }
});

//============= API ==============
const { router } = require('express-file-routing');
require('express-async-errors');

const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(checkAuth);

app.use('/', router());

//========= Error Handlers ==========
app.use((_req, res) => res.status(404).json('Route not found, try another method?'));

app.use((error, _req, res, _next) => {
  console.log('[SERVER ERROR]', error);
  res.status(error.status || 500).json(error.message);
});

//===== Listen on port #### =====
server.listen(3030, () => {
  console.log(`Listening on http://localhost:3030/`);
});
