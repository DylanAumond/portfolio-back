const mongoose = require('mongoose');
const TokenModel = require('../models/Tokens');

// create a new token in the database
module.exports.createRefreshToken = async (token, userId) => {
  try {
    const refreshToken = await TokenModel.create({
      userId,
      token,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports.getToken = async (tokenQuerie) => {
  try {
    // get the token from the database
    const token = await TokenModel.find({ token: tokenQuerie })
    return token
  } catch (error) {
    console.log(error)
    return false
  }
}
