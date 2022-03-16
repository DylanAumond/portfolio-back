import express from "express";
import {
  createTechnologie,
  deleteTechnologie,
  getTechnologies,
} from "../controllers/Technologies.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/", uploadImage.single("logo"), createTechnologie);
router.get("/", getTechnologies);
router.delete("/:id", deleteTechnologie);

export default router;
