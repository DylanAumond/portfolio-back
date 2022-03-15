import express from "express";
import uploadImage from "../middleware/uploadImage.js";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
} from "../controllers/Customers.js";

const router = express.Router();

router.post("/", uploadImage.single("logo"), createCustomer);
router.get("/", getCustomers);
router.delete("/:id", deleteCustomer);

export default router;
