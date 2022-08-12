const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already registered
  const emailExits = await User.findOne({ email: req.body.email });
  if (emailExits) return res.status(400).send('Email already registered');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // created a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    // res.send({ user: user._id });
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the email is exits
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found ');

  // password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid Password');

  // create and assign a token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: '30d',
  });
  res.header('auth-token', token).send(token);
});

module.exports = router;
