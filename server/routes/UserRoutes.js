import express from 'express';
const router = express.Router();
import { authUser, registerUser, getAllUser, getUserById, updateUserById, getUserProfile, updateUserProfile, deleteUser } from '../controllers/UserController.js';

router.route('/').get(getAllUser).post(registerUser);
router.route('/auth').post(authUser)
router.route('/:id').get(getUserById).patch(updateUserById).delete(deleteUser);
router.route('/profile').get(getUserProfile).patch(updateUserById)

export default router;
