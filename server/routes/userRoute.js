import express from 'express'
import {createUser, loginUser, logoutCurrentUser, getCurrentUserProfile, updatecurrentUserProfile, getUser, deleteUser, updateUser} from '../controllers/userController.js'
import {authenticateUsers, authenticateAdmin} from '../middlewares/AuthUsers.js'

const router = express.Router()
router.route('/').post(createUser)
const router = express.Router()

//route to add new users & authorize users
router.route('/create').post(createUser).get(authenticateUsers, authenticateAdmin, getAllUsers)

// user routes to login and logout current user
router.route('./login').post(loginUser)
router.route(./logout).post(logoutCurrentUser)

// route to get current user profile details
// route to update current user profile details
router.route('./profile')
router.get(authenticateUsers, getCurrentUserprofile)
router.put(authenticateUsers, updateCurrentUserProfile)

// ADMIN rights to manage users
// @ CRUD OPS
router.route('./:id')
router.delete(authenticateUsers, authenticateAdmin, deleteUsers)
router.get(authenticateUsers, authenticateAdmin, getUsers)
router.get(authenticateUsers, authenticateAdmin, updateUsers)

export default router
