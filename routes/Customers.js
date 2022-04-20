import express from "express";
import uploadImage from "../middleware/uploadImage.js";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/Customers.js";

const router = express.Router();

router.post("/", uploadImage.single("logo"), createCustomer);
router.get("/", getCustomers);
router.delete("/:id", deleteCustomer);
router.patch("/:id", uploadImage.single("logo"), updateCustomer);
router.get("/:id", getCustomer);

export default router;
