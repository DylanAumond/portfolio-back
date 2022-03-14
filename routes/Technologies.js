import express from "express";
import {
  createTechnologie,
  deleteTechnologie,
} from "../controllers/Technologies.js";

const router = express.Router();

router.post("/", createTechnologie);
router.delete("/:id", deleteTechnologie);

export default router;
