//import mongoose from 'mongoose'
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  libelle: { 
    type: String,
    minLength: 2,
    maxLength: 50,
    uppercase: true,
    unique: true,
    required: true
    },
  url: { 
    type: String ,
    maxLength: 250,
  },
  logo: { 
    type: String,
    required: true 
  },
})

//export default mongoose.model('Customers', customerSchema)
const CustomerModel = mongoose.model('Customers', customerSchema)
module.exports = CustomerModel
