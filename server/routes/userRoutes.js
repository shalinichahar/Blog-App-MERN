const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const generateToken = (id) => {
  return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '1h' });
};

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

router.post('/signup', upload.single('profileImage'), async (req, res) => {
  const { name, email, password } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : '';
  console.log(profileImage)

  try {
    const user = new User({ name, email, password, profileImage });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token, profileImage: user.profileImage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token, profileImage: user.profileImage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

router.get('/auth/verify', protect, async (req, res) => {
  res.json(true);
});

module.exports = { router, protect };
