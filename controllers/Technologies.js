/*import mongoose from 'mongoose'
import Technologies from '../models/Technologies.js'
import fs from 'fs'*/
const mongoose = require('mongoose')
const TechnologyModel = require('../models/Technologies')
const fs = require('fs')


function deleteImage(file) {
  const path = './public/images/' + file
  try {
    fs.unlinkSync(path)
    //file removed
  } catch (err) {
    console.error(err)
  }
}

module.exports.createTechnologie = async (req, res) => {
  const { libelle } = req.body
  const logo = req.file.filename
  try {
    const technologie = await TechnologyModel.create({
      libelle,
      logo,
    })
    return res.status(201).json(technologie)
  } catch (error) {
    console.log(error)
  }
}

module.exports.deleteTechnologie = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: 'This Technologie doesn\'t exist' })
    const technologie = await TechnologyModel.findById(id)
    deleteImage(technologie.logo)
    technologie.remove()
    res.status(200).json({ message: 'Technologie has been deleted' })
  } catch (error) {
    res.status(404).json({ message: 'request want wrong' })
  }
}

// get all technologies
module.exports.getTechnologies = async (req, res) => {
  try {
    const technologies = await TechnologyModel.find()
    res.status(200).json(technologies)
  } catch (error) {
    res.status(404).json({ message: 'request went wrong' })
  }
}

// get a technology from id
module.exports.getTechnologyById = async (req, res) =>{
  const {id} = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
      .status(404)
      .json({ message: 'This Technology doesn\'t exist!'})
    const technologie = await TechnologyModel.findById(id)
    return res.status(200).json(technologie)
  }
  catch(error){
    res.status(400).json({ message: 'something went wrong', error: error })
  }
}

module.exports.updateTechnology = async (req, res) => {
  const { id } = req.params
  const updatedTechnology = req.body
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ message: 'This Technology doesn\'t exist!' })
    if (req.file != null) {
      let technologyImg = await TechnologyModel.findById(id)
      if (technologyImg != null) {
        deleteImage(technologyImg.logo)
      }
      updatedTechnology.logo = req.file.filename
    }
    const technology = await TechnologyModel.findOneAndUpdate(
      { _id: id },
      updatedTechnology,
      {
        new: true,
      }
    )
    res.status(200).json(technology)
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', error: error })
  }
}