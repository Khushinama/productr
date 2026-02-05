import express from 'express'
import { checkAuth, isAuthenticated, sendOtp, logout, register, sendResetOtp,  uploadProfilePic, verifyEmail } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'
import { uploadProfileImage } from "../config/multerConfig.js";

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/send-otp', sendOtp)
authRouter.post('/logout', logout)
authRouter.get('/check-auth', protect,checkAuth);
authRouter.post('/verify-account', verifyEmail);
authRouter.post('/is-auth', protect, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);

authRouter.post(
  "/upload-profile",
  protect,
  uploadProfileImage.single("profile"),
  uploadProfilePic
);


export default authRouter;