import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/Users.js";
import technologyRoutes from "./routes/Technologies.js";
import projectsRoutes from "./routes/Projects.js";
import customersRoutes from "./routes/Customers.js";
import rolesRoutes from "./routes/Roles.js";

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
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//app.use(cors());

// API main routes
app.use("/users", userRoutes);
app.use("/technologies", technologyRoutes);
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
