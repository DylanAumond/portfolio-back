import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  addTechnology,
  deleteUser,
  login,
  refreshUserToken,
  addRoleToUser,
  removeRoleToUser,
} from "../controllers/Users.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", auth, roles(["62441ec203d799fe02f2e56b"]), deleteUser);
router.patch("/:id/technologies/add", addTechnology);
router.patch(
  "/:id/roles/add",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  addRoleToUser
);
router.patch(
  "/:id/roles/remove",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  removeRoleToUser
);
router.post("/login", login);
router.post("/refreshToken", refreshUserToken);

export default router;
