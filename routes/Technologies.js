import express from "express";
import {
  createTechnologie,
  deleteTechnologie,
  getTechnologies,
  updateTechnology,
} from "../controllers/Technologies.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/", uploadImage.single("logo"), createTechnologie);
router.get("/", getTechnologies);
router.delete("/:id", deleteTechnologie);
router.patch("/:id", uploadImage.single("logo"), updateTechnology);

export default router;
