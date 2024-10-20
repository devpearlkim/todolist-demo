const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../util/helper');

require('dotenv').config();

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
};

userSchema.methods.toJSON = function () {
  const userDoc = this._doc;
  delete userDoc.password;
  return userDoc;
};

userSchema.methods.setPassword = async function (password) {
  this.password = await hashPassword(password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
