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
    let email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send('No user with this email');
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send('Incorrect Password');
    }
    // success -> Get a JWT Token
    const accessToken = jwt.sign(
      /* payload */ { email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRY_TIME,
      },
    );

    // req.session.user = user;
    // return res.status(201).send(user);
    res.cookie('token', accessToken, { httpOnly: true });
    res.status(201).send();
  }),
);

// User Registration
router.post(
  '/signup',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('primaryLanguage').isLength({ min: 1 }),
  ],
  runAsyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    // Email must be unique
    const user1 = await User.findOne({ email: req.body.email });
    if (user1) {
      return res.status(400).send('User with this email already exists.');
    }

    const salt = bcrypt.genSaltSync();
    const hashed_password = bcrypt.hashSync(req.body.password, salt);
    // REGISTER USER!!!
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed_password,
      primaryLanguage: req.body.primaryLanguage,
    });
    // success -> Get a JWT Token
    const email = req.body.email;
    const accessToken = jwt.sign(
      /* payload */ { email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRY_TIME,
      },
    );
    res.cookie('token', accessToken, { httpOnly: true });
    //req.session.user = user
    return res.status(201).send(user._id);
  }),
);

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get(
  '/get_current_user',
  auth,
  runAsyncWrapper(async function (req, res) {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });

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

//GET all user outgoing invitations
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

//GET all user incoming invitations
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

//GET all user incoming PENDING invitations
router.get('/:id/invitations/pending', auth, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found');
    }

    const pendingInvitesIn = await Invitation.find({
      toEmail: user.email,
      status: 'pending',
    });

    // console.log('pendingInvitesIn:', pendingInvitesIn);

    //need to find each user by ID and then retrieve their email
    for (let invite of pendingInvitesIn) {
      const user = await User.findById(invite.referrer);
      // console.log('user:', user);
      console.log('invite:', invite);
      invite.referrerEmail = user.email;
    }

    const pendingInvitesOut = await Invitation.find({
      referrer: userId,
      status: 'pending',
    });

    const invites = {
      pendingInvitesIn,
      pendingInvitesOut,
    };

    if (invites.pendingInvitesIn.length < 1 && invites.pendingInvitesOut < 1) {
      return res.status(204).json({ invites, msg: 'No invites' });
    }

    res.json(invites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//POST create a user invitation
router.post(
  '/:id/invitation',
  auth,
  [check('toEmail', 'Email required').isEmail().trim()],
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

//POST send a user invitation
router.post(
  '/:id/invitation/send',
  auth,
  [check('toEmail', 'Email required').isEmail().trim()],
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
      return res.status(204).send('No contacts found.');
    }

    res.json(user.contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
