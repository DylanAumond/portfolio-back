import mongoose from 'mongoose'

const projectSchema = mongoose.Schema({
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
      type: String,
      maxLenght: 250,
    }
  ],
  imgs: [
    {
      type: String 
    }
  ],
  description: { 
    type: String 
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

export default mongoose.model('Projects', projectSchema)
