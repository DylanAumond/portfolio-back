/*import express from 'express'
import uploadImage from '../middleware/uploadImage.js'
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from '../controllers/Customers.js'
import { auth } from '../middleware/auth.js'
import { roles } from '../middleware/roles.js'

const router = express.Router()*/

const router = require('express').Router();
const customersController = require('../controllers/Customers');
const RoleMiddleware = require('../middleware/roles');
const AuthMiddleware = require('../middleware/auth');
const MulterMiddleware = require('../middleware/uploadImage');

// create a customer
router.post(
  '/',
  AuthMiddleware.auth,
  RoleMiddleware.roles(['ADMIN']), // authorised roles
  MulterMiddleware.single('logo'), // upload image
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
  MulterMiddleware.single('logo'),
  customersController.updateCustomer
)

// get a customer by id
router.get('/:id', customersController.getCustomer)

//export default router
module.exports = router;
