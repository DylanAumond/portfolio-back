import Projects from "../models/Projects.js";
import mongoose from "mongoose";

export const createProject = async (req, res) => {
  const { libelle, state, imgs, description, customer } = req.body;
  try {
    const result = await Projects.create({
      libelle,
      state,
      imgs,
      description,
      customer,
    });
    res.status(201).json({ result });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "This Project doesn't exist!" });

    await Projects.findByIdAndRemove(id);
    res.json({ message: "Project has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "This project doesn't exist" });
    const project = await Projects.findById(id);
    res.status(200).json(project);
  } catch (error) {}
};
