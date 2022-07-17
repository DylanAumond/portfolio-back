import mongoose from 'mongoose'

const technologySchema = mongoose.Schema({
  libelle: { type: String, unique: true, required: true },
  logo: { type: String, unique: true },
})
export default mongoose.model('Technologies', technologySchema)
