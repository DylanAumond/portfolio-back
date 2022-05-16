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

router.post(
  "/",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  uploadImage.single("logo"),
  createTechnologie
);
router.get("/", getTechnologies);
router.delete(
  "/:id",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  deleteTechnologie
);
router.patch(
  "/:id",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  uploadImage.single("logo"),
  updateTechnology
);

export default router;
