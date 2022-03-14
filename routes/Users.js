import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  addTechnology,
  deleteUser,
} from "../controllers/Users.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch("/:id/technologies/add", addTechnology);

export default router;
