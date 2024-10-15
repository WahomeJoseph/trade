import User from "../models/userModel.js";
import asyncHandler from '../middlewares/asyncHandler.js'

export const createUser = asyncHandler(async (req, res) => {
    res.send('Hello There!')
})
