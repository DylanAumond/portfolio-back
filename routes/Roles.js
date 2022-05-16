import express from "express";
import { createRole, deleteRole, getRoles } from "../controllers/Roles.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();

router.post("/", auth, roles(["62441ec203d799fe02f2e56b"]), createRole);
router.get("/", auth, roles(["62441ec203d799fe02f2e56b"]), getRoles);
router.delete("/:id", auth, roles(["62441ec203d799fe02f2e56b"]), deleteRole);

export default router;
