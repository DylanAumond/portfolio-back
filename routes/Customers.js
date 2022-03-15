import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
} from "../controllers/Customers.js";

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.delete("/:id", deleteCustomer);

export default router;
