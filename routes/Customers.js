const router = require('express').Router();
const customersController = require('../controllers/Customers');
const RoleMiddleware = require('../middleware/roles');
const AuthMiddleware = require('../middleware/auth');
const MulterMiddleware = require('../middleware/uploadImage');
const SharpMiddleware = require('../middleware/sharp');

// create a customer
router.post(
  '/',
  AuthMiddleware.auth,
  RoleMiddleware.roles(['ADMIN']), // authorised roles
  MulterMiddleware.single('logo'), // upload image
  SharpMiddleware.compressImage(200,200), // compress image
  customersController.createCustomer
)

// get all customers
router.get('/', customersController.getCustomers)

// Delete a customer
router.delete(
  '/:id',
  AuthMiddleware.auth,
  RoleMiddleware.roles(['ADMIN']), // authorised roles
  customersController.deleteCustomer
)

// update a customer
router.patch(
  '/:id',
  AuthMiddleware.auth, // Need auth
  RoleMiddleware.roles(['ADMIN']), // authorised roles
  MulterMiddleware.single('logo'), // upload image
  SharpMiddleware.compressImage(200,200), // compress image
  customersController.updateCustomer
)

// get a customer by id
router.get('/:id', customersController.getCustomer)

//export default router
module.exports = router;
