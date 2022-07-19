import mongoose from 'mongoose'

const roleSchema = mongoose.Schema({
  libelle: { 
    type: String,
    maxLenght: 50,
    uppercase: true,
    required: true, 
    unique: true
  },
})

export default mongoose.model('Roles', roleSchema)
