const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password_hash: passwordHash });

  await user.save();

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.status(200).json({ token });
};

module.exports = {
  register,
  login,
};
