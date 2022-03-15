import express from "express";
import {
  createTechnologie,
  deleteTechnologie,
  getTechnologies,
} from "../controllers/Technologies.js";

const router = express.Router();

router.post("/", createTechnologie);
router.get("/", getTechnologies);
router.delete("/:id", deleteTechnologie);

export default router;
