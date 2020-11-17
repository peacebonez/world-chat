const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const auth = require('../middleware/auth');
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
  //auth,
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
  //auth,
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

router.get(
  '/get_by_id/:id',
  runAsyncWrapper(async function (req, res) {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
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
router.get('/:id/invitations/out', async (req, res) => {
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
router.get('/:id/invitations/in', async (req, res) => {
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

//POST create a user invitation
router.post('/:id/invitation', async (req, res) => {
  const referrer = req.params.id;
  try {
    const user = await User.findById(referrer);

    if (!user) {
      res.status(404).send('User not found');
    }
    const emails = req.body.emailList;

    //for each email create an invitation instance
    for (const email of emails) {
      //determine if referrer already sent invitation to receiver
      const invitations = await Invitation.find({ toEmail: email });

      const invitationAlreadySent = invitations.find(
        (invitation) => invitation.referrer.toString() === referrer,
      );

      //can't send invite if already sent but CAN if the invite was rejected
      if (invitationAlreadySent && invitation.status !== 'rejected') {
        console.log('Invitation already sent');
      } else {
        const newInvitation = new Invitation({
          referrer: user,
          toEmail: email,
        });

        await newInvitation.save();
      }
    }

    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//POST send a user invitation
router.post('/:id/invitation/send', async (req, res) => {
  try {
    //locate user from parameter
    const user = await User.findById(req.params.id);
    console.log('user:', user);

    if (!user) {
      res.status(404).send('User not found');
    }

    const msg = {
      to: req.body.emailList,
      from: 'teamcocoapuffs1@gmail.com',
      subject: 'Chat-App: A friend has invited you to chat!',
      text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000`,
    };
    console.log('msg:', msg);

    sgMail.send(msg, (err, info) => {
      if (err) {
        return console.error('Email not sent');
      }
      res.json({ msg: 'Email sent!' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
