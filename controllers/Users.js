import Users from '../models/Users.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import uid from 'uid-safe'
import { createRefreshToken, getToken } from './Tokens.js'

export const createUser = async (req, res) => {
  // get data from request
  const {
    firstName,
    lastName,
    town,
    street,
    country,
    postalCode,
    mail,
    password,
  } = req.body
  try {
    const user = await Users.create({
      // convert lastName and firstName to fullName
      fullName: lastName + ' ' + firstName,
      // create credentials object with mail and password
      credentials: {
        mail: mail,
        password: await bcrypt.hash(password, 12),
      },
      // create address object
      address: {
        postalCode: postalCode,
        town: town,
        street: street,
        country: country,
      },
    })
    // return the created user
    return res.status(201).json({ user })
  } catch (error) {
    // return http error response 400
    res.status(400).json(error)
  }
}

export const login = async (req, res) => {
  // get credentials from request
  const { mail, password } = req.body

  try {
    // find user by mail
    const user = await Users.findOne({ 'credentials.mail': mail }).populate('roles')

    // check if user exist
    if (!user)
      return res
        .status(400)
        .json({ message: `Aucun compte n'est associé à cette email` })
    
    // compare request password and database password
    const passwordCorrect = await bcrypt.compare(
      password,
      user.credentials.password
    )

    // check if password is correct
    if (!passwordCorrect)
      // return error message with code 400
      return res.status(400).json({ message: 'Mot de passe incorrect' })
    
    //generate random xrsf token
    const xsrfToken = uid.sync(18)

    //create JWT token
    const jwtToken = jwt.sign(
      { id: user._id, roles: user.roles, xsrfToken }, //data stored in the token
      process.env.JWTKEY, //jwt's private key
      { expiresIn: '1m' } //token's validity time
    )

    //create refresh token
    const refreshToken = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.REFRESHKEY
    )

    // store refresh token in the database
    createRefreshToken(refreshToken, user._id)

    // store access token in the request cookies
    res.cookie('access_token', jwtToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      //secure: false, // true to force https
    })
    
    // store refresh token in the request cookies
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      //secure: false,
    })

    // send both accessToken and refreshToken with xsrfToken
    res.status(200).json(xsrfToken)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export const refreshUserToken = async (req, res) => {
  // get the refresh token from cookies
  const refreshToken = req.cookies['refresh_token']

  // get the xrsf token from request headers
  const xsrfToken = req.headers['x-xsrf-token']

  try {
    // check if refresh token exist
    if (refreshToken === undefined) return res.status(403).json({ message: 'refresh token isn\'t available' }) 

    // check if the token is in the database
    if (getToken(refreshToken) === false) return res.status(403).json({ message: 'refresh token isn\'t valid' })
    
    // check if refresh token is expired
    jwt.verify(refreshToken, process.env.REFRESHKEY, (error, user) => {

      // return an error with 403 status
      if (error) return res.status(403).json(error)
      // create access token
      const jwtToken = jwt.sign(
        { id: user.id, roles: user.roles, xsrfToken }, //data stored in the token
        process.env.JWTKEY, //jwt's private key
        { expiresIn: '1m' } //token's validity time
      )

      // set the token in the response cookies
      res.cookie('access_token', jwtToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
        //secure: true, // true to force https
      })

      // send the response as a success with the cookie
      return res.status(202).json({ message: 'token has been refreshed' })
    })

  } catch (error) {}
}

// get all users
export const getUsers = async (req, res) => {
  try {
    const users = await Users.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error })
  }
}

// get an user by id
export const getUserById = async (req, res) => {
  // get the id of the user from the request params
  const { id } = req.params
  try {
    // find the user from the id
    const user = await Users.findOne({ _id: id })
    // send the user
    res.status(200).json(user)
  } catch (error) {
    // return an error 404
    res.status(404).json({ message: 'cette utilisateur n\'existe pas.' })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'this user doens\'t exist' })
    await Users.findByIdAndRemove(id)
    res.status(200).json({ message: 'User has been deleted' })
  } catch (error) {
    res.status(404).json({ message: 'request want wrong' })
  }
}

export const addTechnology = async (req, res) => {
  const { technologyId } = req.body
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    await user.update({
      $addToSet: { technologies: technologyId },
      new: true,
      upsert: true,
    })
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
  }
}

export const addRoleToUser = async (req, res) => {
  // get the role id from the request body
  const { roleId } = req.body
  // get the user id from the request params
  const { id } = req.params
  try {
    // find user from the id
    const user = await Users.findById(id)
    // add a role to the user
    await user.update({
      $addToSet: { roles: roleId },
      new: true,
      upsert: true,
    })
    // send the updated user
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
  }
}

export const removeRoleToUser = async (req, res) => {
  // get the role id from the request body
  const { roleId } = req.body
  // get the user id from the request params
  const { id } = req.params
  try {
    // find user from the id
    const user = await Users.findById(id)
    // remove a role to the user
    await user.update({
      $pull: { roles: roleId },
    })
    // send the updated user
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
  }
}
