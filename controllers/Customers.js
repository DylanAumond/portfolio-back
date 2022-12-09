const mongoose = require('mongoose');
const CustomerModel = require('../models/Customers');
const fs = require('fs');


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
module.exports.createCustomer = async (req, res) => {
  // get data from request
  const { libelle, url } = req.body
  // get file from request
  const logo = req.file.filename
  try {
    const customer = await CustomerModel.create({
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
module.exports.deleteCustomer = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This Customer doesn\'t exist!' })

    const customer = await CustomerModel.findById(id)
    deleteImage(customer.logo)
    customer.remove()
    res.json({ message: 'Customer has been deleted' })
  } catch (error) {
    res.status(404).json({ message: 'request want wrong' })
  }
}

// get all customers
module.exports.getCustomers = async (req, res) => {
  try {
    // get all customers in the database
    const customers = await CustomerModel.find()
    // return status code 200 and a list of customers
    res.status(200).json(customers)
  } catch (error) {
    res.status(404).json(error)
  }
}

// get a customer by id
module.exports.getCustomer = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This Customer doesn\'t exist!' })
    const customer = await CustomerModel.findById(id)
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', error: error })
  }
}

// update a customer
module.exports.updateCustomer = async (req, res) => {
  const { id } = req.params
  const updatedCustomer = req.body
  try {
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This Customer doesn\'t exist!' })
    if (req.file != null) {
      // find customer by id in db
      const customerImg = await CustomerModel.findById(id)
      // if customer has an image
      if (customerImg != null) {
        // delete the customer image
        deleteImage(customerImg.logo)
      }
      // update the customer image src
      updatedCustomer.logo = req.file.filename
    }
    const customer = await CustomerModel.findOneAndUpdate(
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


