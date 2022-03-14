import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  libelle: { type: String, required: true },
  webSite: { type: String },
  logo: { type: String, required: true },
});

export default mongoose.model("Customers", customerSchema);
