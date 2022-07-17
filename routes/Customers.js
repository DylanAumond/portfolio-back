import express from 'express'
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

const router = express.Router()
// create a customer
router.post(
  '/',
  auth,
  roles(['ADMIN']), // authorised roles
  uploadImage.single('logo'), // upload image
  createCustomer
)

// get all customers
router.get('/', getCustomers)

// Delete a customer
router.delete(
  '/:id',
  auth,
  roles(['ADMIN']), // authorised roles
  deleteCustomer
)

// update a customer
router.patch(
  '/:id',
  auth, // Need auth
  roles(['ADMIN']), // authorised roles
  uploadImage.single('logo'),
  updateCustomer
)

// get a customer by id
router.get('/:id', getCustomer)

export default router
