const User = require('../model/User');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const createUser = async (name, email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error('이미 가입이 된 유저입니다');
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({ email, name, password: hashedPassword });
  await newUser.save();
  return newUser;
};

module.exports = { createUser };
