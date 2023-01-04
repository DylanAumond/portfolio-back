const router = require('express').Router();
const usersController = require('../controllers/Users');
const AuthMiddleware = require('../middleware/auth');
const RoleMiddleware = require('../middleware/roles');

// create a user
router.post("/", usersController.createUser);

// get all users
router.get("/", usersController.getUsers);

// get a user by id
router.get("/:id", usersController.getUserById);

// delete a user by id
router.delete(
  "/:id",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // autorised roles
  usersController.deleteUser);

// add a new technology to a user
router.patch("/:id/technologies/add", usersController.addTechnology);

// add a new role to a user
router.patch(
  "/:id/roles/add",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // autorised roles
  usersController.addRoleToUser
);

// remove a role to an user
router.patch(
  "/:id/roles/remove",
  AuthMiddleware.auth, // need auth
  RoleMiddleware.roles(["ADMIN"]), // autorised roles
  usersController.removeRoleToUser
);

// login use to set access token
router.post("/login", usersController.login);

// refreshUserToken
router.post("/refreshToken", usersController.refreshUserToken);

module.exports = router;
