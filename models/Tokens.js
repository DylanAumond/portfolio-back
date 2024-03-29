//import mongoose from 'mongoose'
const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 60 * 60 * 24 },
  },
})

//export default mongoose.model('Tokens', tokenSchema)
const TokenModel = mongoose.model('Tokens', tokenSchema)
module.exports = TokenModel
