const router = require('express').Router();
const RoleController = require("../controllers/Roles")
const RoleMiddleware = require("../middleware/roles")
const AuthMiddleware = require("../middleware/auth")


// Create a new role
router.post(
    "/",
    AuthMiddleware.auth, // need auth
    RoleMiddleware.roles(["ADMIN"]),
    RoleController.createRole);

router.get(
    "/",
    AuthMiddleware.auth, // need auth
    RoleMiddleware.roles(["ADMIN"]),
    RoleController.getRoles);

router.delete(
    "/:id",
    AuthMiddleware.auth, // need auth
    RoleMiddleware.roles(["ADMIN"]),
    RoleController.deleteRole);

module.exports = router;
