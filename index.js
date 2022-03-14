import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/Users.js";
import technologyRoutes from "./routes/Technologies.js";
import projectsRoutes from "./routes/Projects.js";
import customersRoutes from "./routes/Customers.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/users", userRoutes);
app.use("/technologies", technologyRoutes);
app.use("/projects", projectsRoutes);
app.use("/customers", customersRoutes);

mongoose
  .connect(process.env.CONNEXION_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error.message));
