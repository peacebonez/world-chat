const router = require('express').Router()

const passport = require('passport')
const { User } = require('../models')
const { check, validationResult } = require('express-validator')

require('dotenv').config()

// User Login
router.post('/users/login', (req, res) => {
    User.authenticate()(req.body.email, req.body.password, (err, user) => {
        if (err) res.send(err)
        res.json({
            isLoggedIn: !!user,
            email: user.email,
            id: user._id
        })
    })
})

// User Registration
router.post('/users/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], (req, res) => {
    const errors = validateResult(req)
    if (!errors.isEmpty()) 
      return res.status(422).json({ errors: errors.array() });
    if (req.body.email === '') {
      res.status(400).json({ message: "Email required" });
    } else if (req.body.password === '') {
      res.status(400).json({ message: "Password required" });
    }
    User.register(new User({
      email: req.body.email,
      password: req.body.password
    }), req.body.password, err => {
      if (err) res.send(err);
      // successful making of a new User
      res.sendStatus(201);
    })
})

module.exports = router