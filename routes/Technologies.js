const router = require('express').Router();
const technologiesController = require('../controllers/Technologies');
const AuthMiddleware = require('../middleware/auth');
const RoleMiddleware = require('../middleware/roles');
const MulterMiddleware = require('../middleware/uploadImage');
const SharpMiddleware = require('../middleware/sharp');

// Create a new Technology
router.post(
  "/",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  MulterMiddleware.single("logo"), // upload image
  SharpMiddleware.compressImage(200,200), // compress image
  technologiesController.createTechnologie
);

// Get all technologies
router.get("/", technologiesController.getTechnologies);

// Get a technology by id
router.get("/:id", technologiesController.getTechnologyById)

// Delete a technology
router.delete(
  "/:id",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  technologiesController.deleteTechnologie
);
// Update a technology
router.patch(
  "/:id",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  MulterMiddleware.single("logo"), // upload image
  SharpMiddleware.compressImage(200,200), // compress image
  technologiesController.updateTechnology
);

module.exports = router;
