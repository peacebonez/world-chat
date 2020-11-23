const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config({ path: '../.env' });

const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const Invitation = require('../models/Invitation');

const JWT_EXPIRY_TIME = 30 * 60 * 60 * 24; // 30 days

// use this for running async functions
function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
}

sgMail.setApiKey(process.env.EMAIL_KEY);

// User Login
router.post(
  '/login',
  runAsyncWrapper(async (req, res) => {
    const email = req.body.email;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('No user with this email');
      } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).send('Incorrect Password');
      }

      const payload = {
        user: {
          id: user._id,
          email,
        },
      };

      // success -> Get a JWT Token
      jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: JWT_EXPIRY_TIME },
        (err, token) => {
          if (err) throw err;
          return res
            .status(201)
            .cookie('token', token, { httpOnly: true })
            .json({ token, msg: 'User Authenticated' });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }),
);

// User Registration
router.post(
  '/signup',
  [
    check('name', 'Name required').notEmpty(),
    check('email', 'Email required').isEmail().trim(),
    check('password', 'Password required').isLength({ min: 6 }),
    check('primaryLanguage', 'Please choose a language').isLength({ min: 1 }),
  ],
  runAsyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { name, email, password, primaryLanguage } = req.body;

    try {
      // Email must be unique
      let user = await User.findOne({ email });
      //if we find a user they already have an account
      if (user) {
        return res.status(400).json({ msg: 'This user already exists' });
      }

      const salt = bcrypt.genSaltSync();
      const hashed_password = bcrypt.hashSync(password, salt);

      // REGISTER USER!!!
      user = new User({
        name,
        email,
        password: hashed_password,
        primaryLanguage,
      });

      await user.save();

      //Set up the jwt payload to user ID and email option
      const payload = {
        user: {
          id: user._id,
          email,
        },
      };

      // success -> Get a JWT Token
      //the payload is the data being encrypted
      jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: JWT_EXPIRY_TIME },
        (err, token) => {
          if (err) throw err;
          return res
            .status(201)
            .cookie('token', token, { httpOnly: true })
            .json({ token, msg: 'Register Success!' });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }),
);

router.get(
  '/get_current_user',
  auth,
  runAsyncWrapper(async function (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    } else {
      return res.status(200).json(user);
    }
  }),
);

router.get(
  '/get_all',
  runAsyncWrapper(async function (req, res) {
    const users = await User.find();
    return res.status(200).json(users);
  }),
);

router.get(
  '/:id',
  runAsyncWrapper(async function (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    } else {
      return res.status(200).json(user);
    }
  }),
);

//GET all user outgoing invitations PRIVATE ROUTE
router.get('/:id/invitations/out', auth, async (req, res) => {
  const userId = req.params.id;
  try {
    const invites = await Invitation.find({ referrer: userId });

    if (invites.length < 1) {
      res.status(404).send('No invitations found.');
    }

    res.json(invites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//GET all user incoming invitations PRIVATE ROUTE
router.get('/:id/invitations/in', auth, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found');
    }

    const invites = await Invitation.find({ toEmail: user.email });

    if (invites.length < 1) {
      res.status(204).send('No invitations found.');
    }

    res.json(invites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//POST create a user invitation PRIVATE ROUTE
router.post(
  '/:id/invitation',
  [check('toEmail', 'Email required').isEmail().trim()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const referrer = req.params.id;
    const toEmail = req.body.toEmail;

    try {
      const user = await User.findById(referrer);

      if (!user) {
        return res.status(404).json({ msg: 'User not found', toEmail });
      }
      //TODO: SETUP UP CONDITION THAT YOU CANNOT INVITE YOURSELF

      //find all outgoing invitations to the toEmail (array)
      const invitations = await Invitation.find({ toEmail });

      //see if an invitation was alreasdy sent from user to toEmail
      const invitationAlreadyCreated = invitations.find(
        (invitation) => invitation.referrer.toString() === referrer,
      );
      //can't send invite if already sent
      if (invitationAlreadyCreated) {
        return res
          .status(400)
          .json({ msg: 'Invitation already created.', toEmail });
      } else {
        const newInvitation = new Invitation({
          referrer: user,
          toEmail,
        });

        await newInvitation.save();
        res.status(200).json({ msg: 'Invitation created!', toEmail });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//POST send a user invitation PRIVATE ROUTE
router.post(
  '/:id/invitation/send',
  [check('toEmail', 'Email required').isEmail().trim()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const toEmail = req.body.toEmail;
    console.log('toEmail:', toEmail);

    try {
      //locate user from parameter
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found', toEmail });
      }

      const msg = {
        to: toEmail,
        from: 'teamcocoapuffs1@gmail.com',
        subject: 'WorldChat: A friend has invited you to chat!',
        text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000/register`,
      };

      sgMail.send(msg, (err, info) => {
        if (err) {
          return res.status(400).json({ msg: 'Email error', toEmail });
        }
        return res.status(200).json({ msg: 'Email sent!', toEmail });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },
);

//GET user contacts PRIVATE ROUTE
router.get('/:id/contacts', auth, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).send('User not found');
    }

    if (user.contacts.length < 1) {
      return res.status(204).json({ msg: 'No contacts found.' });
    }

    res.json(user.contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
