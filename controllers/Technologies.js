import mongoose from "mongoose";
import Technologies from "../models/Technologies.js";

export const createTechnologie = async (req, res) => {
  const { libelle } = req.body;
  try {
    const technologie = await Technologies.create({
      libelle,
    });
    return res.status(201).json(technologie);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTechnologie = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: "This Technologie doesn't exist" });
    res.status(200).json({ message: "Technologie has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};
