import Customers from "../models/Customers.js";
import mongoose from "mongoose";
import fs from "fs";

function deleteImage(file) {
  const path = "./public/images/" + file;
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {
    console.error(err);
  }
}

export const createCustomer = async (req, res) => {
  const { libelle, website } = req.body;
  const logo = req.file.filename;
  try {
    const customer = await Customers.create({
      libelle,
      website,
      logo,
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "This Customer doesn't exist!" });

    const customer = await Customers.findById(id);
    deleteImage(customer.logo);
    customer.remove();
    res.json({ message: "Customer has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customers.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json(error);
  }
};
