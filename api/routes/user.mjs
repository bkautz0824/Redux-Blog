import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user.mjs";
import Blog from "../models/blogPost.mjs";
import _ from "lodash"

const userRouter = express.Router()

const createUser = async(req, res) => {
    let secret 
    let user = await User.findOne({username:req.body.username})
    if(user) return res.status(400).send("That username is already taken")
    // Insert the new user if they do not exist yet
  try {
    user = await new User(_.assign(_.pick(req.body, ['username', 'password']), { _id: new mongoose.Types.ObjectId() }))
    
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    console.log('RUNNING SAVE')
 
  secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'secret'
    const token = jwt.sign({ _id: user._id }, secret);
    
  return res.header('x-auth-token', token).send(_.assign(_.pick(user, ['_id', 'username', 'password']), {token: token}));
 
  } catch (errors) { 
    console.log(errors)
    let errorMessages = []
      Object.keys(errors).forEach(key => errorMessages.push(errors[key].properties.message))
    console.log(errors)
    const errorObject = {
      errors: errorMessages
    }
    return res.send(errorObject).status(403)
  }
}; 


userRouter.post('/create', createUser)

export default userRouter