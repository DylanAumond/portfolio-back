import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  libelle: { type: String, required: true, unique: true },
});

export default mongoose.model("Roles", roleSchema);
