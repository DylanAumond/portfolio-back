import Projects from "../models/Projects.js";
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

export const createProject = async (req, res) => {
  const { libelle, state, description, customer, technologies } = req.body;
  const imgs = [];
  const images = req.files;
  if (images) {
    images.forEach((img) => {
      imgs.push(img.filename);
    });
  }
  try {
    const project = await Projects.create({
      libelle,
      state,
      imgs,
      description,
      customer,
      technologies: technologies,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "This Project doesn't exist!" });
    const project = await Projects.findOne({ _id: id });
    project.imgs.forEach((img) => {
      deleteImage(img);
    });
    project.remove();
    res.json({ message: "Project has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find().populate([
      "technologies",
      "customer",
    ]);
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findById(id).populate([
      "technologies",
      "customer",
    ]);
    if (project != null) return res.status(200).json([project]);
    res.status(404).json({ message: "this project isn't on our website" });
  } catch (error) {}
};

export const addTechnoToProject = async (req, res) => {
  const { projectId, technologyId } = req.body;
  try {
    const project = await Projects.findById(projectId);
    await project.update({
      $addToSet: { technologies: technologyId },
      new: true,
      upsert: true,
    });
    project.save();
    res.status(201).json({ message: "techno has been haded to this project" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const removeTechnoFromProject = async (req, res) => {
  const { projectId, technologyId } = req.body;
  try {
    const project = await Projects.findById(projectId);
    await project.update({
      $pull: { technologies: technologyId },
    });
    res
      .status(201)
      .json({ message: "techno has been remove from this project" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
