'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET || 'my-secret';
const jwt = require('jsonwebtoken');


// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

usersSchema.pre('save', async function (next){
  this.password = await bcrypt.hash(this.password,10);
  next();
});


// Create a method to authenticate user using bcrypt

// create a method to authenticate token using jwt
// statics metods: they do not relate to an instance

usersSchema.statics.authenticateToken = async function(token) {
  console.log('tokennnnnn', token);
  let payload = jwt.verify(token, SECRET);
  return await this.findOne({username: payload.username});
}

const Users = mongoose.model('users', usersSchema);

module.exports = Users;