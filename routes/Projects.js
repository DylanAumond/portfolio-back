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
  roles(["ADMIN"]), // authorised roles
  uploadImage.array("imgs"),
  createProject
);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.patch(
  "/technology/add",
  auth,
  roles(["ADMIN"]), // authorised roles
  addTechnoToProject
);
router.patch(
  "/technology/remove",
  auth,
  roles(["ADMIN"]), // authorised roles
  removeTechnoFromProject
);
router.delete(
  "/:id",
  auth,
  roles(["ADMIN"]), // authorised roles deleteProject
  );

export default router;
