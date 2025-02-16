import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import { genToken } from '../utils/createToken.js'

// function create a new user account
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) { 
    return res.status(400).json({message: 'All inputs are required!'})
  }

  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({message: "User already exists"});

  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // add new user
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    genToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    return res.status(400);
    throw new Error("No Match Found!");
  }
});

// fcn for users to login 
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      return res.status(401).json({message: 'Invalid Email or Password'})
    }

      genToken(res, existingUser._id);

      return res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
  }
});

// fcn to logout current user after time out sessions
export const logOutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Please Login Again!" });
});


// fetch & get all users 
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

// fcn get current user profile
export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    return res.status(404).json({message: 'No User Found!'})
  }
});

// update user profile after logging in
export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("No Match Found!");
  }
});

// delete a users account
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("No Match Found!");
  }
});

// fetch a single user...all but their credentials
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("No Match Found!");
  }
});

// update a user account profile
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("No Match Found!");
  }
});

