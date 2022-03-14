import Customers from "../models/Customers.js";
import mongoose from "mongoose";

export const createCustomer = async (req, res) => {
  const { libelle, website, logo } = req.body;
  try {
    const result = await Customers.create({
      libelle,
      website,
      logo,
    });
    res.status(201).json({ result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "This Customer doesn't exist!" });

    const customer = await Customers.findByIdAndRemove(id);
    res.json({ message: "Customer has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};
