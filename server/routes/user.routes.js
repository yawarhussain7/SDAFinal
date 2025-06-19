import { User } from "../controllers/user.js";
import express from 'express';
import { authorized } from "../middleware/authMiddleware.js";

const router = express.Router();
const userController = new User();
// for verfiy
router.post('/user/register', (req, res) => userController.register(req, res));
router.post('/user/login', (req, res) => userController.login(req, res));

// for update user profile
router.patch('/user/update', authorized, (req, res) => userController.updateProfile(req, res));


// to reset 
router.post('/user/sentOtp', (req, res) => userController.sentOtp(req, res));
router.post('/user/verifyOtp', (req, res) => userController.verifyOtp(req, res));
router.post('/user/resetPassword', (req, res) => userController.resetPassword(req, res));


export default router;