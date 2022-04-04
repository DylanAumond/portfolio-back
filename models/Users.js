import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true, unique: true },
  credentials: {
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  address: {
    town: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technologies" }],
});

export default mongoose.model("Users", userSchema);
