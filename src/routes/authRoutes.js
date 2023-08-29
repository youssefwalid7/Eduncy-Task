import express from 'express'
import { AuthverifyEmail, AuthResendCode, AuthSignin, AuthSignout, AuthSignup } from '../controllers/AuthController.js';

const router = express.Router();

// Route for user sign-up
router.post('/signup', AuthSignup);

// Route for user sign-in
router.post('/signin', AuthSignin);

// Route for verifying user's email
router.post('/verify', AuthverifyEmail);

// Route for resending verification code
router.post('/resendcode', AuthResendCode);

// Route for Signing out
router.get('/signout', AuthSignout)


export default router;