//import mongoose from 'mongoose'
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String,
    maxLenght: 250,
    required: true,
    unique: true
  },
  credentials: {
    mail: { 
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
  },
  address: {
    town: {
      type: String,
      maxLenght: 150,
    },
    street: { 
      type: String, 
      maxLenght: 100,
    },
    postalCode: { 
      type: String,
      maxLenght: 20
    },
    country: { 
      type: String,
      maxLenght: 100
    },
  },
  roles: [
    { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Roles' 
    }
  ],
  technologies: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Technologies' 
    }
  ],
})

//export default mongoose.model('Users', userSchema)
const UserModel = mongoose.model('Users', userSchema)
module.exports = UserModel