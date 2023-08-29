import { verifyEmail, resendCode, signin, signout, refresh_token, signup } from '../services/AuthServices.js'
import emailRegex from "../utils/constants.js";
import jwt from 'jsonwebtoken';

// Handle user sign-up
export const AuthSignup = async (req, res) => {
    try {
        const { preferred_username, email, password } = req.body;
        if (!email || !emailRegex.test(email)) {
            console.log("please enter a valid email")
        } if (!password || password.length < 8) {
            console.log("password must be at least 8 characters")
        } else {
            const user = await signup(preferred_username, email, password);
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Verify user's email with a verification code
export const AuthverifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!code || code.length < 6) {
            console.error("please enter a vaild 6 digits code")
        } else {
            const user = await verifyEmail(email, code);
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Resend verification code to user's email
export const AuthResendCode = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        if (!email || !emailRegex.test(email)) {
            console.log("please enter a valid email")
        } else {
            const user = await resendCode(email);
            res.json(user);

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Handle user sign-in
export const AuthSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !emailRegex.test(email)) {
            console.log("Please enter a valid email")
        } if (!password) {
            console.log("Please enter your Password")
        } else {
            const user = await signin(email, password);
            res.status(200).json({ user });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Handle user sign-out
export const AuthSignout = async (req, res) => {
    try {
        const result = await signout();
        res.status(200).json({ message: result })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const result = await refresh_token();
        res.status(200).json({ message: result })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}