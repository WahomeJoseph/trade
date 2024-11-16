import express from 'express'
<<<<<<< HEAD
import {createUser} from '../controllers/userController.js'
<<<<<<< HEAD

const router = express.Router()

router.route('/').post(createUser)
=======
=======
import {createUser, loginUser, logoutCurrentUser, getCurrentUserProfile, updatecurrentUserProfile, getUser, deleteUser, updateUser} from '../controllers/userController.js'
>>>>>>> 770c8dd450ffb3911f481d8058b6817de6658b51
import {authenticateUsers, auhenticateAdmin} from '../middlewares/AuthUsers.js'
const router = express.Router()

// end point to add new users
router.route('/create').post(createUser)
  // authorize users
  .get(authenticateUsers, authenticateAdmin, getAllUsers)
>>>>>>> 53ead0993cb34018e689ebaef64eabcf3e0097b0

// user routes
router.route('./login').post(loginUser)
router.route(./logout).post(LogoutUser)

router.route('./profile')
router.get(authenticateUsers, getCurrentUserprofile)
router.put(authenticateUsers, updateCurrentUserProfile)

// ADMIN rights to manage users
router.route('./:id')
router.delete(authenticateUsers, authenticateAdmin, deleteUserById)
router.get(authenticateUsers, authenticateAdmin, getUsersById)
router.get(authenticateUsers, authenticateAdmin, updateUsersById)

export default router
