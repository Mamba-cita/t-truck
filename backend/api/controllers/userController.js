const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, city, state, country, role } = req.body;
  // Check if required fields are missing
  if (!name || !email || !password || !city || !state || !country) {
    res.status(400);
    throw new Error('All fields are required');
  }
  // Check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create new user
  const user = await User.create({ name, email, password: hashedPassword, city, state, country, role });
  if (user) {
    const token = await generateToken(user._id);
    res.status(201).json({
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      country: user.country,
      role: user.role,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  // Check if password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = await generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  res.status(200).json(user);

});

const generateToken = asyncHandler(async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
