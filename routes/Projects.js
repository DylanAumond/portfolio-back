import express from "express";
import {
  addTechnoToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  removeTechnoFromProject,
} from "../controllers/Projects.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/", uploadImage.array("imgs"), createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.patch("/technology/add", addTechnoToProject);
router.patch("/technology/remove", removeTechnoFromProject);
router.delete("/:id", deleteProject);

export default router;
