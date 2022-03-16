import express from "express";
import {
  createProject,
  deleteProject,
  getProjectByLibelle,
  getProjects,
} from "../controllers/Projects.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:libelle", getProjectByLibelle);
router.delete("/:id", deleteProject);

export default router;
