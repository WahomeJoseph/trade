import express from 'express'
import {createUser, loginUser, logOutUser, getCurrentUserProfile, getAllUsers, getUser, deleteUser, updateUser, updateCurrentUserProfile} from '../controllers/userController.js'
import {authUsers, authAdmin} from '../middlewares/AuthUsers.js'

const router = express.Router()
 
router.route('/create').post(createUser)
 .get(authUsers, authAdmin, getAllUsers)

//  http:localhost:2700/api/users/auth/
router.route('/login').post(loginUser)
router.route('/logOut').post(logOutUser) 

router.route('/profile')
      .get(authUsers, getCurrentUserProfile)
      .put(authUsers, updateCurrentUserProfile)

// ADMIN rights to manage users
router.route('/:id')
      .delete(authUsers, authAdmin, deleteUser)
      .get(authUsers, authAdmin, getUser)
      .get(authUsers, authAdmin, updateUser)

export default router
