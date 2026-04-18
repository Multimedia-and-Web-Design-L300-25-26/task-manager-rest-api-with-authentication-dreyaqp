import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser) ;
  // - Validate input
  // - Check if user exists
  // - Hash password
  // - Save user
  // - Return user (without password)


// POST /api/auth/login
router.post("/login",loginUser);
  // - Find user
  // - Compare password
  // - Generate JWT
  // - Return token


export default router;