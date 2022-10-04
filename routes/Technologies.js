/*import express from "express";
import {
  createTechnologie,
  deleteTechnologie,
  getTechnologies,
  getTechnologyById,
  updateTechnology,
} from "../controllers/Technologies.js";

import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();*/

const router = require('express').Router();
const technologiesController = require('../controllers/Technologies');
const AuthMiddleware = require('../middleware/auth');
const RoleMiddleware = require('../middleware/roles');
const MulterMiddleware = require('../middleware/uploadImage');

// Create a new Technology
router.post(
  "/",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  MulterMiddleware.single("logo"),
  technologiesController.createTechnologie
);

// Get all technologies
router.get("/", technologiesController.getTechnologies);

// Get a technology by id
router.get("/:id", technologiesController.getTechnologyById)

// Delete a technology
router.delete(
  "/:id",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  technologiesController.deleteTechnologie
);
// Update a technology
router.patch(
  "/:id",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  MulterMiddleware.single("logo"),
  technologiesController.updateTechnology
);

//export default router;
module.exports = router;
