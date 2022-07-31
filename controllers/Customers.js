import Customers from '../models/Customers.js'
import mongoose from 'mongoose'
import fs from 'fs'


function deleteImage(file) {
  const path = './public/images/' + file
  try {
    fs.unlinkSync(path)
    //file removed
  } catch (err) {
    console.error(err)
  }
}

// create a new customer
export const createCustomer = async (req, res) => {
  // get data from request
  const { libelle, url } = req.body
  // get file from request
  const logo = req.file.filename
  try {
    const customer = await Customers.create({
      libelle,
      url,
      logo,
    })
    // return 201 code & the new customer
    res.status(201).json(customer)
  } catch (error) {
    // return an error message
    res.status(400).json({ error })
  }
}

// delete a customer
export const deleteCustomer = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This Customer doesn\'t exist!' })

    const customer = await Customers.findById(id)
    deleteImage(customer.logo)
    customer.remove()
    res.json({ message: 'Customer has been deleted' })
  } catch (error) {
    res.status(404).json({ message: 'request want wrong' })
  }
}

// get all customers
export const getCustomers = async (req, res) => {
  try {
    // get all customers in the database
    const customers = await Customers.find()
    // return status code 200 and a list of customers
    res.status(200).json(customers)
  } catch (error) {
    res.status(404).json(error)
  }
}

// get a customer by id
export const getCustomer = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This Customer doesn\'t exist!' })
    const customer = await Customers.findById(id)
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', error: error })
  }
}

// update a customer
export const updateCustomer = async (req, res) => {
  const { id } = req.params
  const updatedCustomer = req.body
  try {
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This Customer doesn\'t exist!' })
    if (req.file != null) {
      // find customer by id in db
      const customerImg = await Customers.findById(id)
      // if customer has an image
      if (customerImg != null) {
        // delete the customer image
        deleteImage(customerImg.logo)
      }
      // update the customer image src
      updatedCustomer.logo = req.file.filename
    }
    const customer = await Customers.findOneAndUpdate(
      { _id: id },
      updatedCustomer,
      {
        new: true,
      }
    )
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', error: error })
  }
}
