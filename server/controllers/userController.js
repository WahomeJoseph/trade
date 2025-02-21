import bcrypt from "bcryptjs";
import { genToken } from '../utils/createToken.js'
import Users from "../models/userModel.js";

// function create a new user account
export const createUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'All inputs are required!' })
    return
  }
  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format!' });
    return
  }
  // password validation
  if (password.length < 8) {
    res.status(400).json({ message: 'Password must be at least 8 characters long!' });
    return
  }

  // check if user exist
  const userExists = await Users.findOne({ email })
  if (userExists) {
    res.status(400).json({ message: "User already exist!" });
    return
  }

  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // add new user
  try {
    const newUser = new Users({ username, email, isAdmin, password: hashedPassword });
    await newUser.save();
    genToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create new user' });
    return
  }
}

// fxn for users to login 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      res.status(400).json({message: 'User Not Found!'})
      return 
    }

    const isPasswordValid = await bcrypt.compare(password,existingUser.password);
    if (!isPasswordValid) {
      res.status(401).json({message: 'Invalid Email or Password!'})
      return 
    }

      genToken(res, existingUser._id);
      return res.status(200).json({
        message: 'Login Successful!',
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' }, error.message)
  }
}

// fxn to logout current user after timeout sessions
export const logOutUser = async (req, res) => {
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "User is logged out. Proceed to login!" });
}


// fetch & get all users 
export const getAllUsers = async (req, res) => {
  const users = await Users.find({});
  return res.json(users);
}

// fcn get current user profile
export const getCurrentUserProfile = async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    return res.status(404).json({ message: 'No User Found!' })
  }
}

// update user profile after logging in
export const updateCurrentUserProfile = async (req, res) => {
  const user = await Users.findById(req.user._id);

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
}

// delete a users account
export const deleteUser = async (req, res) => {
  const user = await Users.findById(req.params.id);

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
}

// fetch a single user...all but their credentials
export const getUser = async (req, res) => {
  const user = await Users.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("No Match Found!");
  }
}

// update a user account profile
export const updateUser = async (req, res) => {
  const user = await Users.findById(req.params.id);

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
}

