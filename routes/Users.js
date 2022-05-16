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

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch("/:id/technologies/add", addTechnology);
router.patch("/:id/roles/add", addRoleToUser);
router.patch("/:id/roles/remove", removeRoleToUser);
router.post("/login", login);
router.post("/refreshToken", refreshUserToken);

export default router;
