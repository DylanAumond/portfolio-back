/*import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";*/
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const customersRoutes = require('./routes/Customers');
const technologiesRoutes = require('./routes/Technologies');
const projectsRoutes = require('./routes/Projects');
const usersRoutes = require('./routes/Users');
const rolesRoutes = require('./routes/Roles');
/*import userRoutes from "./routes/Users.js";
import technologyRoutes from "./routes/Technologies.js";
import projectsRoutes from "./routes/Projects.js";
import customersRoutes from "./routes/Customers.js";
import rolesRoutes from "./routes/Roles.js";*/

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
};
app.use(cors(corsOptions));
//app.use(cors());

// API main routes
app.use("/users", usersRoutes);
app.use("/technologies", technologiesRoutes);
app.use("/projects", projectsRoutes);
app.use("/customers", customersRoutes);
app.use("/roles", rolesRoutes);
app.use("/public", express.static("public"));

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error.message));
