const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const register = async ({ username, password }) => {
  const taken = await User.find({ username }).exec();
  if (taken.length) {
    // case: username is taken
    throw Error('Username taken');
  } else {
    // case: username is free
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await new User({ username, password: hash }).save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return { ...user[0]._doc, token };
  }
}

const login = async ({ username, password }) => {
  const user = await User.find({ username }).exec();
  if (!user.length) {
    // case: user not found
    throw Error('Username not found');
  } else {
    // case: user found
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      // case: incorrect password
      throw Error('Incorrect password');
    } else {
      // case: correct password
      const token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET);
      return { ...user[0]._doc, token };
    }
  } 
}

module.exports = {
  register,
  login
};