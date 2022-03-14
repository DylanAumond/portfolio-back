import Users from "../models/Users.js";
import mongoose from "mongoose";

export const createUser = async (req, res) => {
  const { firstName, lastName, address } = req.body;
  try {
    const user = await Users.create({
      fullName: lastName + " " + firstName,
      address: {
        postalCode: address.postalCode,
        town: address.town,
        street: address.street,
        country: address.country,
      },
    });
    return res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "cette utilisateur n'existe pas." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "this user doens't exist" });
    await Users.findByIdAndRemove(id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};

export const addTechnology = async (req, res) => {
  const { technologyId } = req.body;
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    await user.update({
      $addToSet: { technologies: technologyId },
      new: true,
      upsert: true,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
