import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true, unique: true },
  credentials: {
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  address: {
    town: { type: String },
    street: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roles' }],
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Technologies' }],
})

export default mongoose.model('Users', userSchema)
