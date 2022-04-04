import Users from "../models/Users.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uid from "uid-safe";
import { createRefreshToken, getToken } from "./Tokens.js";

export const createUser = async (req, res) => {
  const { firstName, lastName, address, credentials } = req.body;
  try {
    const user = await Users.create({
      fullName: lastName + " " + firstName,
      credentials: {
        mail: credentials.mail,
        password: await bcrypt.hash(credentials.password, 12),
      },
      address: {
        postalCode: address.postalCode,
        town: address.town,
        street: address.street,
        country: address.country,
      },
    });
    return res.status(201).json({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await Users.findOne({ "credentials.mail": mail });
    if (!user)
      return res
        .status(400)
        .json({ message: `Aucun compte n'est associé à cette email` });
    const passwordCorrect = await bcrypt.compare(
      password,
      user.credentials.password
    );
    if (!passwordCorrect)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    const xsrfToken = uid.sync(18); //generate random xrsf token
    //create JWT token
    const jwtToken = jwt.sign(
      { id: user._id, roles: user.roles, xsrfToken }, //data stored in the token
      process.env.JWTKEY, //jwt's private key
      { expiresIn: "10m" } //token's validity time
    );
    //create refresh token
    const refreshToken = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.REFRESHKEY
    );
    //store refresh token in db
    createRefreshToken(refreshToken, user._id);
    res.cookie("access_token", jwtToken, {
      httpOnly: true,
      //TODO: passer le site https
      //secure: true, // true to force https
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      //secure: true,
    });
    res.status(200).json(xsrfToken);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies["refresh_token"];
  const xsrfToken = req.headers["x-xsrf-token"];
  try {
    if (refreshToken != undefined) {
      if (getToken(refreshToken)) {
        jwt.verify(refreshToken, process.env.REFRESHKEY, (error, user) => {
          if (error) return res.status(403).json(error);
          console.log(user);
          //create JWT token
          const jwtToken = jwt.sign(
            { id: user.id, roles: user.roles, xsrfToken }, //data stored in the token
            process.env.JWTKEY, //jwt's private key
            { expiresIn: "10m" } //token's validity time
          );
          res.cookie("access_token", jwtToken, {
            httpOnly: true,
            //TODO: passer le site https
            //secure: true, // true to force https
          });
          res.status(200).json({ message: "token has been refreshed" });
        });
      } else {
        res.status(404).json({ message: "refresh token isn't available" });
      }
    }
  } catch (error) {}
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "cette utilisateur n'existe pas." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "this user doens't exist" });
    await Users.findByIdAndRemove(id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "request want wrong" });
  }
};

export const addTechnology = async (req, res) => {
  const { technologyId } = req.body;
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    await user.update({
      $addToSet: { technologies: technologyId },
      new: true,
      upsert: true,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
