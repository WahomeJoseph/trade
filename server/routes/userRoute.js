
import express from 'express'
import { createUser, loginUser, limiter, logOutUser, getCurrentUserProfile, getAllUsers, getUser, deleteUser, updateUser, updateCurrentUserProfile } from '../controllers/userController.js'
import { authUsers, authAdmin } from '../middlewares/AuthUsers.js'

export const userRouter = express.Router()

userRouter.post('/register', createUser)
userRouter.get('/', authAdmin, getAllUsers)

userRouter.post('/login', loginUser, limiter)
userRouter.post('/logout', logOutUser)

// get and update user profile
userRouter.get('/profile').get(authUsers, getCurrentUserProfile).put(authUsers, updateCurrentUserProfile)

// ADMIN rights to manage users
userRouter.route('/:id')
      .delete(authUsers, authAdmin, deleteUser)
      .get(authUsers, authAdmin, getUser)
      .put(authUsers, authAdmin, updateUser)
