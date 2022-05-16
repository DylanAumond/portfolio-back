import express from "express";
import uploadImage from "../middleware/uploadImage.js";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/Customers.js";
import { auth } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();

router.post(
  "/",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  uploadImage.single("logo"),
  createCustomer
);
router.get("/", getCustomers);
router.delete(
  "/:id",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  deleteCustomer
);
router.patch(
  "/:id",
  auth,
  roles(["62441ec203d799fe02f2e56b"]),
  uploadImage.single("logo"),
  updateCustomer
);
router.get("/:id", getCustomer);

export default router;
