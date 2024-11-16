import express from 'express'
import {createUser, loginUser, logoutCurrentUser, getCurrentUserProfile, updatecurrentUserProfile, getUser, deleteUser, updateUser} from '../controllers/userController.js'
import {authenticateUsers, authenticateAdmin} from '../middlewares/AuthUsers.js'

const router = express.Router()
router.route('/').post(createUser)

// end point to add new users  
router.route('/create').post(createUser)
  // authorize users
  .get(authenticateUsers, authenticateAdmin, getAllUsers)

// user routes
router.route('./login').post(loginUser)
router.route(./logout).post(logoutCurrentUser)

router.route('./profile')
router.get(authenticateUsers, getCurrentUserprofile)
router.put(authenticateUsers, updateCurrentUserProfile)

// ADMIN rights to manage users
router.route('./:id')
router.delete(authenticateUsers, authenticateAdmin, deleteUserById)
router.get(authenticateUsers, authenticateAdmin, getUsersById)
router.get(authenticateUsers, authenticateAdmin, updateUsersById)

export default router
