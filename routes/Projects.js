import express from "express";
import {
  addTechnoToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  removeTechnoFromProject,
} from "../controllers/Projects.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.post(
  "/",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  uploadImage.array("imgs"),
  createProject
);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.patch(
  "/technology/add",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  addTechnoToProject
);
router.patch(
  "/technology/remove",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  removeTechnoFromProject
);
router.delete("/:id", auth, roles(["62441ec203d799fe02f2e56b"]), deleteProject);

export default router;
