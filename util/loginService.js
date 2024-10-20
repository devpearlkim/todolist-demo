const User = require('../model/User');
const bcrypt = require('bcrypt');

const isPasswordMatch = (inputPassword, storedPassword) => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};

const loginWithEmail = async (email, password) => {
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new Error('회원가입 후 로그인해주세요');
  }

  const passwordMatches = isPasswordMatch(password, foundUser.password);
  if (!passwordMatches) {
    throw new Error('이메일 또는 비밀번호를 확인해주세요');
  }

  return foundUser;
};

module.exports = { loginWithEmail };
