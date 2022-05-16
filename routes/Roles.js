import express from "express";
import { createRole, deleteRole, getRoles } from "../controllers/Roles.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();

router.post("/", createRole);
router.get("/", auth, roles(["62441ec203d799fe02f2e56b"]), getRoles);
router.delete("/:id", deleteRole);

export default router;
