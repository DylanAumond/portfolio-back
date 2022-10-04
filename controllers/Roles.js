//import Roles from '../models/Roles.js'
//import mongoose from 'mongoose'
const mongoose = require('mongoose');
const RoleModel = require('../models/Roles');


module.exports.createRole = async (req, res) => {
  const { libelle } = req.body
  try {
    const role = await RoleModel.create({
      libelle: libelle.toUpperCase().replace(/\s+/g, '_'),
    })
    return res.status(201).json(role)
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports.getRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find()
    res.status(200).json(roles)
  } catch (error) {
    res.status(404).json({ message: 'request went wrong' })
  }
}

module.exports.deleteRole = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This role doesn\'t exist' })
    await RoleModel.findByIdAndRemove(id)
    res.status(200).json({ message: 'role has been deleted' })
  } catch (error) {
    res.status(400).json({ message: 'request went wrong' })
  }
}
