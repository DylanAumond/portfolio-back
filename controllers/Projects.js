import Projects from '../models/Projects.js'
import mongoose from 'mongoose'
import fs from 'fs'

function deleteImage(file) {
  // image's path
  const path = './public/images/' + file
  try {
    // delete the image
    fs.unlinkSync(path)
  } catch (err) {
    console.error(err)
  }
}

export const createProject = async (req, res) => {
  // get all data from the request
  const { libelle, description, customer, technologies, tasks } = req.body
  // return an array of images' name
  const imgs = req.files !== undefined ? req.files.map((img) => img.filename) : null
  try {
    // create a new project object
    const project = await Projects.create({
      libelle,
      description: JSON.parse(description),
      customer: JSON.parse(customer),
      tasks: JSON.parse(tasks),
      imgs, // array of image
      technologies: JSON.parse(technologies), // array of technology
    })
    // retrun success with code 201 and the project
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateProject = async (req, res) => {
  // get project id from the request params
  const { id } = req.params

  const imgs = req.body.imgs
  // return an array of images' name
  for(const img of req.files) {
    imgs.push(img.filename)
  }
  //const newImgs = req.files !== undefined ? req.files.map((img) => img.filename) : null
  const updatedProject = {
    libelle: req.body.libelle,
    description: JSON.parse(req.body.description),
    customer: JSON.parse(req.body.customer),
    tasks: JSON.parse(req.body.tasks),
    imgs: imgs, // array of image
    technologies: JSON.parse(req.body.technologies), // array of technology
  }
  console.log(req.body.imgs)
  try {
    //check if project exist
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'This Project doesn\'t exist!' })
    if (req.file != null) {
      let ProjectImg = await Projects.findById(id)
      if (ProjectImg != null) {
        deleteImage(ProjectImg.logo)
      }
      updatedProject.logo = req.file.filename
    }
    const project = await Projects.findOneAndUpdate(
      { _id: id },
      updatedProject,
      {
        new: true,
      }
    )
    res.status(200).json(project)
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', error: error })
  }
}

// delete a project from the database
export const deleteProject = async (req, res) => {
  // get id from the request's params
  const { id } = req.params

  try {
    // check if project exist
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'This Project doesn\'t exist!' })

    // select the project
    const project = await Projects.findOne({ _id: id })

    // delete each image associated with the project
    project.imgs.forEach((img) => {
      // delete an image
      deleteImage(img)
    })

    // delete the project
    project.remove()

    // send a success message
    res.json({ message: 'Project has been deleted' })
  } catch (error) {
    // send a error message
    res.status(400).json({ message: 'request want wrong' })
  }
}

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find().populate([
      'technologies',
      'customer',
    ])
    res.status(200).json(projects)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getProjectById = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Projects.findById(id).populate([
      'technologies',
      'customer',
    ])
    if (project != null) return res.status(200).json([project])
    res.status(404).json({ message: 'this project isn\'t on our website' })
  } catch (error) {}
}

export const addTechnoToProject = async (req, res) => {
  const { projectId, technologyId } = req.body
  try {
    const project = await Projects.findById(projectId)
    await project.update({
      $addToSet: { technologies: technologyId },
      new: true,
      upsert: true,
    })
    project.save()
    res.status(201).json({ message: 'techno has been haded to this project' })
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'Something went wrong' })
  }
}

export const removeTechnoFromProject = async (req, res) => {
  const { projectId, technologyId } = req.body
  try {
    const project = await Projects.findById(projectId)
    await project.update({
      $pull: { technologies: technologyId },
    })
    res
      .status(201)
      .json({ message: 'techno has been remove from this project' })
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'Something went wrong' })
  }
}
