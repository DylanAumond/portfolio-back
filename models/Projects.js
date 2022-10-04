//import mongoose from 'mongoose'
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  libelle: { 
    type: String,
    maxLenght: 1000,
    required: true,
    unique: true 
  },
  // tasks is an array of object
  tasks: [
    // task is an object with a string
    {
      fr:String,
      en:String,
    }
  ],
  imgs: [
    {
      type: String 
    }
  ],
  description: {
    fr:String,
    en:String
  },
  technologies: [
    { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Technologies' 
    }
  ],
  workers: [
    { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Users' 
    }
  ],
  customer: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Customers' 
  },
})

//export default mongoose.model('Projects', projectSchema)
const ProjectModel = mongoose.model('Projects', projectSchema)

module.exports = ProjectModel
