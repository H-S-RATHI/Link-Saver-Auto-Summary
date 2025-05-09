import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const user = await User.create({
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export { registerUser, loginUser, getUserProfile }
