const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { User } = require('../models');
const { check, validationResult } = require('express-validator')

require('dotenv').config()
const JWT_EXPIRY_TIME = 30 * 60 * 60 * 24; // 30 days

// use this for running async functions
function runAsyncWrapper (callback) {
  return function (req, res, next) {
      callback(req, res, next)
      .catch(next)
  }
}

// User Login
router.post('/login', auth, runAsyncWrapper( async (req, res) => {
  let email = req.body.email
  const user = await User.findOne({ email: email });
  if (!user) { 
    return res.status(400).send("No user with this email"); 
  } 
  else if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(400).send("Incorrect Password"); 
  } 
  // success -> Get a JWT Token
  const accessToken = jwt.sign(/* payload */{ email }, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_EXPIRY_TIME,
  });

  // req.session.user = user;
  // return res.status(201).send(user);
  res.cookie("token", accessToken, { httpOnly: true });
  res.status(201).send();
}))

// User Registration
router.post('/signup', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('primaryLanguage').isLength({ min: 1})
], auth, runAsyncWrapper( async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(422).json({ errors: errors.array() });
    
    // Email must be unique
    const user1 = await User.findOne({ email: req.body.email})
    if (user1) {
      return res.status(400).send('User with this email already exists.')
    }

    const salt = bcrypt.genSaltSync();
    const hashed_password = bcrypt.hashSync(req.body.password, salt);
    // REGISTER USER!!!
    const user = await User.create( {
      email: req.body.email,
      password: hashed_password,
      primaryLanguage: req.body.primaryLanguage
    })
    // success -> Get a JWT Token
    const accessToken = jwt.sign(/* payload */{ email }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: JWT_EXPIRY_TIME,
    });
    res.cookie("token", accessToken, { httpOnly: true });
    //req.session.user = user
    return res.status(201).send(user._id)
}))

router.get("/get_by_id/:id", runAsyncWrapper(async function(req, res) {
  const user = await User.findById(req.params.id);
  return res.status(200).json(user);
}));

router.get("/get_all", runAsyncWrapper(async function(req, res) {
  const users = await User.find();
  return res.status(200).json(users);
}));

module.exports = router;