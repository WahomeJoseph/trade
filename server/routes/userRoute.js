import express from 'express'
import {createUser, loginUser, logOutUser, getCurrentUserProfile, getAllUsers, getUser, deleteUser, updateUser, updateCurrentUserProfile} from '../controllers/userController.js'
import {authUsers, authAdmin} from '../middlewares/AuthUsers.js'

const router = express.Router()
 
router.route('/register')
      .post(createUser)
      .get(authUsers, authAdmin, getAllUsers)

router.post('/login',loginUser)
router.post('/logout',logOutUser) 

// get and update user profile
router.route('/profile')
      .get(authUsers, getCurrentUserProfile)
      .put(authUsers, updateCurrentUserProfile)

// ADMIN rights to manage users
router.route('/:id')
      .delete(authUsers, authAdmin, deleteUser)
      .get(authUsers, authAdmin, getUser)
      .put(authUsers, authAdmin, updateUser)

export default router
