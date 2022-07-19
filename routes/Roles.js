import express from "express";
import { createRole, deleteRole, getRoles } from "../controllers/Roles.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();

// Create a new role
router.post(
    "/",
    auth, // need auth
    roles(["ADMIN"]),
    createRole);

router.get(
    "/",
    auth, // need auth
    roles(["ADMIN"]),
    getRoles);

router.delete(
    "/:id",
    auth, // need auth
    roles(["ADMIN"]),
    deleteRole);

export default router;
