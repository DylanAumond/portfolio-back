import mongoose from 'mongoose'

const customerSchema = mongoose.Schema({
  libelle: { 
    type: String,
    minLength: 2,
    maxLength: 50,
    uppercase: true,
    unique: true,
    required: true
    },
  webSite: { type: String },
  logo: { type: String, required: true },
})

export default mongoose.model('Customers', customerSchema)
