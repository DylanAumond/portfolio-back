import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  libelle: { type: String, required: true, unique: true },
  state: { type: Boolean, required: true },
  imgs: [{ type: String }],
  description: { type: String },
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technologies" }],
  workers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  customer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customers" }],
});

export default mongoose.model("Projects", projectSchema);
