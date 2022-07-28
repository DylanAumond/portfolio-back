import express from "express";
import {
  addTechnoToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  removeTechnoFromProject,
  updateProject,
} from "../controllers/Projects.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();
// create a new project
router.post(
  "/",
  auth, // need auth
  roles(["ADMIN"]), // authorised roles
  uploadImage.array("imgs"),
  createProject
);

// get all projects
router.get("/", getProjects);

// get a project
router.get("/:id", getProjectById);

// update a project
router.patch("/:id",
auth, // need auth
roles(["ADMIN"]), // authorised roles
uploadImage.array("imgs"),
updateProject
);

// remove a new project's technologies
router.patch(
  "/technology/add",
  auth, // need auth
  roles(["ADMIN"]), // authorised roles
  addTechnoToProject
);

// remove a new project's technologies
router.patch(
  "/technology/remove",
  auth, // need auth
  roles(["ADMIN"]), // authorised roles
  removeTechnoFromProject
);

// delete a project
router.delete(
  "/:id",
  auth, // need auth
  roles(["ADMIN"]), // authorised roles 
  deleteProject
  );

export default router;
