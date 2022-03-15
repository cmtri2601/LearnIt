require('dotenv').config();
const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// @route GET api/auth
// @desc check if user is login
// @access public
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  //simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });

  try {
    //Checking user exist
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'Username already taken' });
    //All goood
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();

    //Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRETE
    );

    res.json({
      success: true,
      nessage: 'User create successfully!',
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({
      success: false,
      message: 'Missing username and/or password',
    });

  try {
    //Check existing user
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        success: false,
        message: 'Incorrect username or password',
      });

    //Username fond
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res.json({
        success: false,
        message: 'Incorrect username or password',
      });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRETE
    );

    res.json({
      success: true,
      nessage: 'Logged in successfully!',
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});
module.exports = router;
