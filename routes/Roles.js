import express from "express";
import { createRole, deleteRole, getRoles } from "../controllers/Roles.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createRole);
router.get("/", auth, getRoles);
router.delete("/:id", deleteRole);

export default router;
