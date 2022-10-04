/*import express from "express";
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

const router = express.Router();*/

const router = require('express').Router();
const projectsController = require('../controllers/Projects');
const AuthMiddleware = require('../middleware/auth');
const RoleMiddleware = require('../middleware/roles');
const MulterMiddleware = require('../middleware/uploadImage');


// create a new project
router.post(
  "/",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  MulterMiddleware.array("imgs"),
  projectsController.createProject
);

// get all projects
router.get("/", projectsController.getProjects);

// get a project
router.get("/:id", projectsController.getProjectById);

// update a project
router.patch("/:id",
AuthMiddleware.auth, // need auth
RoleMiddleware.roles(["ADMIN"]), // authorised roles
MulterMiddleware.array("imgs"),
projectsController.updateProject
);

// remove a new project's technologies
router.patch(
  "/technology/add",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  projectsController.addTechnoToProject
);

// remove a new project's technologies
router.patch(
  "/technology/remove",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  projectsController.removeTechnoFromProject
);

// delete a project
router.delete(
  "/:id",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles 
  projectsController.deleteProject
  );

module.exports = router;
