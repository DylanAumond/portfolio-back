//import mongoose from 'mongoose'
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  libelle: { 
    type: String,
    maxLenght: 50,
    uppercase: true,
    required: true, 
    unique: true
  },
})

//export default mongoose.model('Roles', roleSchema)
const RoleModel = mongoose.model('Roles', roleSchema)

module.exports = RoleModel
