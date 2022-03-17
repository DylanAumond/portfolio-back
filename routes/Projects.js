import express from "express";
import {
  createProject,
  deleteProject,
  getProjectByLibelle,
  getProjects,
} from "../controllers/Projects.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/", uploadImage.array("imgs"), createProject);
router.get("/", getProjects);
router.get("/:libelle", getProjectByLibelle);
router.delete("/:id", deleteProject);

export default router;
