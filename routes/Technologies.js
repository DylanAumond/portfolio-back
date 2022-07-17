import express from "express";
import {
  createTechnologie,
  deleteTechnologie,
  getTechnologies,
  updateTechnology,
} from "../controllers/Technologies.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

// Create a new Technology
router.post(
  "/",
  auth, // need auth
  roles(["ADMIN"]), // authorised roles
  uploadImage.single("logo"),
  createTechnologie
);

// Get all technology
router.get("/", getTechnologies);

// Delete a technology
router.delete(
  "/:id",
  auth, // need auth
  roles(["ADMIN"]), // authorised roles
  deleteTechnologie
);

// Update a technology
router.patch(
  "/:id",
  auth, // need auth
  roles(["ADMIN"]), // authorised roles
  uploadImage.single("logo"),
  updateTechnology
);

export default router;
