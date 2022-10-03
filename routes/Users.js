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

// create a user
router.post("/", createUser);

// get all users
router.get("/", getUsers);

// get a user by id
router.get("/:id", getUserById);

// delete a user by id
router.delete(
  "/:id",
  auth, // need auth
  roles(["ADMIN"]), // autorised roles
  deleteUser);

// add a new technology to a user
router.patch("/:id/technologies/add", addTechnology);

// add a new role to a user
router.patch(
  "/:id/roles/add",
  auth, // need auth
  roles(["ADMIN"]), // autorised roles
  addRoleToUser
);

// remove a role to an user
router.patch(
  "/:id/roles/remove",
  auth, // need auth
  roles(["ADMIN"]), // autorised roles
  removeRoleToUser
);

// login use to set access token
router.post("/login", login);

// refreshUserToken
router.post("/refreshToken", refreshUserToken);

export default router;
