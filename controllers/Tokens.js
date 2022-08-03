import mongoose from 'mongoose'
import Tokens from '../models/Tokens.js'

// create a new token in the database
export async function createRefreshToken(token, userId) {
  try {
    const refreshToken = await Tokens.create({
      userId,
      token,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function getToken(tokenQuerie) {
  try {
    // get the token from the database
    const token = await Tokens.find({ token: tokenQuerie })
    return token
  } catch (error) {
    console.log(error)
    return false
  }
}
