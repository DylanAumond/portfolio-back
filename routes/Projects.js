const router = require('express').Router();
const projectsController = require('../controllers/Projects');
const AuthMiddleware = require('../middleware/auth');
const RoleMiddleware = require('../middleware/roles');
const MulterMiddleware = require('../middleware/uploadImage');
const SharpMiddleware = require('../middleware/sharp');


// create a new project
router.post(
  "/",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  MulterMiddleware.array("imgs"),
  SharpMiddleware.compressImage(1280,720),
  projectsController.createProject
);

// get all projects
router.get("/", projectsController.getProjects);

// get a project
router.get("/:id", projectsController.getProjectById);

// update a project
router.patch("/:id",
AuthMiddleware.auth, // need auth
RoleMiddleware.roles(["ADMIN"]), // authorised roles
MulterMiddleware.array("imgs"),
SharpMiddleware.compressImage(1280,720),
projectsController.updateProject
);

// remove a new project's technologies
router.patch(
  "/technology/add",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  projectsController.addTechnoToProject
);

// remove a new project's technologies
router.patch(
  "/technology/remove",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles
  projectsController.removeTechnoFromProject
);

// delete a project
router.delete(
  "/:id",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // authorised roles 
  projectsController.deleteProject
  );

module.exports = router;
