'use strict';

require('dotenv').config();
const server = require('./src/app.js');

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options).then(()=> console.log('Connected to DB'));

const PORT = process.env.PORT || 3030

server.startup(PORT);