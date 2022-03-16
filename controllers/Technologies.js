import mongoose from "mongoose";
import Technologies from "../models/Technologies.js";
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

export const createTechnologie = async (req, res) => {
  const { libelle } = req.body;
  const logo = req.file.filename;
  try {
    const technologie = await Technologies.create({
      libelle,
      logo,
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
    const technologie = await Technologies.findById(id);
    deleteImage(technologie.logo);
    technologie.remove();
    res.status(200).json({ message: "Technologie has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};

export const getTechnologies = async (req, res) => {
  try {
    const technologies = await Technologies.find();
    res.status(200).json(technologies);
  } catch (error) {
    res.status(404).json({ message: "request went wrong" });
  }
};
