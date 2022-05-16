import Roles from "../models/Roles.js";
import mongoose from "mongoose";

export const createRole = async (req, res) => {
  const { libelle } = req.body;
  try {
    const role = await Roles.create({
      libelle: libelle.toUpperCase().replace(/\s+/g, "_"),
    });
    return res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getRoles = async (req, res) => {
  console.log(req.roles);
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(404).json({ message: "request went wrong" });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "This role doesn't exist" });
    await Roles.findByIdAndRemove(id);
    res.status(200).json({ message: "role has been deleted" });
  } catch (error) {
    res.status(400).json({ message: "request went wrong" });
  }
};
