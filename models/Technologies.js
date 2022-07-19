import mongoose from 'mongoose'

const technologySchema = mongoose.Schema({
  libelle: {
    type: String,
    minLength: 1,
    maxLength: 50,
    uppercase: true,
    unique: true,
    required: true 
  },
  logo: {
    type: String,
    unique: true 
  },
})
export default mongoose.model('Technologies', technologySchema)
