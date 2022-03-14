import express from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
} from "../controllers/Projects.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);

export default router;
