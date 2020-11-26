const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const multer = require('multer');
const AWS = require('aws-sdk');
require('dotenv').config({ path: '../.env' });

const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const Conversation = require('../models/Conversation');

const JWT_EXPIRY_TIME = 30 * 60 * 60 * 24; // 30 days

// use this for running async functions
function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
}

sgMail.setApiKey(process.env.EMAIL_KEY);

// User Login
router.post('/login', async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('No user with this email');
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send('Incorrect Password');
    }
    //Set up the jwt payload to user ID and email option
    const payload = {
      id: user._id,
      email,
    };

    // success -> Get a JWT Token
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: JWT_EXPIRY_TIME,
      },
      (err, token) => {
        if (err) throw err;
        return res
          .status(201)
          .cookie('token', token, { httpOnly: true })
          .json(user);
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    res.clearCookie('token').send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
        id: user._id,
        email,
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
    const user = await User.findById(req.user.id);

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

router.get(
  '/get_all',
  runAsyncWrapper(async function (req, res) {
    const users = await User.find();
    return res.status(200).jsonp(users);
  }),
);

//GET all user conversations PRIVATE
router.get('/conversations', auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const conversations = await Conversation.find({
      members: { _id: userId },
    });

    if (conversations.length < 1) {
      return res.status(204).json({ error: 'No conversations found' });
    }

    return res.status(200).json({ conversations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//GET all user outgoing invitations PRIVATE ROUTE
router.get('/invitations/out', auth, async (req, res) => {
  const userId = req.user.id;
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
router.get('/invitations/in', auth, async (req, res) => {
  const userId = req.user.id;
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

//GET all user incoming PENDING invitations PRIVATE
router.get('/invitations/pending', auth, async (req, res) => {
  const userId = req.user.id;
  let invites = {
    pendingInvitesIn: [],
    pendingInvitesOut: [],
  };
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const pendingInvitesIn = await Invitation.find({
      toEmail: user.email,
      status: 'pending',
    });

    const pendingInvitesOut = await Invitation.find({
      referrer: userId,
      status: 'pending',
    });

    invites = {
      pendingInvitesIn,
      pendingInvitesOut,
    };

    if (invites.pendingInvitesIn.length < 1 && invites.pendingInvitesOut < 1) {
      return res.status(204).json(invites);
    }

    res.json(invites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//POST create a user invitation PRIVATE ROUTE
router.post(
  '/invitation',
  [check('toEmail', 'Email required').isEmail().trim()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const referrer = req.user.id;
    const toEmail = req.body.toEmail;

    try {
      const user = await User.findById(referrer);

      if (!user) {
        return res.status(404).json({ msg: 'User not found', toEmail });
      }

      //Cannot invite yourself
      if (user.email === toEmail)
        return res
          .status(400)
          .json({ msg: 'Sorry but you cannot invite yourself', toEmail });

      /*
      THIS IS AN OPTIONAL CONDITION WE MAY WANT TO IMPLEMENT
      check if receiver is already on the platform
      const isReceiverAlreadyMember = await User.findOne({ email: toEmail });

      if (isReceiverAlreadyMember) {
        return res.status(400).json({ msg: 'User not on platform', toEmail });
      }
      */

      //Find all invitations sent to the receiver
      const invitations = await Invitation.find({ toEmail });

      //see if an invitation was already sent from user to receiver
      const invitationAlreadyCreated = invitations.find(
        (invitation) => invitation.referrer.toString() === referrer,
      );

      // can't send invite if already sent
      if (invitationAlreadyCreated) {
        return res
          .status(400)
          .json({ msg: 'Invitation already created.', toEmail });
      }

      const newInvitation = new Invitation({
        referrer: user,
        referrerEmail: user.email,
        toEmail,
      });

      await newInvitation.save();

      res.status(200).json({ msg: 'Invitation created!', toEmail });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//POST send a user invitation PRIVATE ROUTE
router.post(
  '/invitation/send',
  [check('toEmail', 'Email required').isEmail().trim()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const toEmail = req.body.toEmail;

    try {
      //locate user from parameter
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found', toEmail });
      }

      //Cannot invite yourself
      if (user.email === toEmail)
        return res
          .status(400)
          .json({ msg: 'Sorry but you cannot invite yourself', toEmail });

      //If toEmail is already in current user's contacts
      const alreadyFriends = user.contacts.find(
        (contact) => contact.email.toString() === toEmail,
      );

      if (alreadyFriends) {
        return res
          .status(400)
          .json({ msg: 'Email already in user contacts.', toEmail });
      }

      //from email must match sendGrid account email
      const msg = {
        to: toEmail,
        from: 'teamcocoapuffs1@gmail.com',
        subject: 'WorldChat: A friend has invited you to chat!',
        text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000/signup?referral=${user.email}`,
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
router.get('/contacts', auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

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

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/avatar', auth, upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(404).send('File not found');
  }
  const userId = req.user.id;
  const s3FileUrl = process.env.AWS_S3_FILE_URL;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: user.email,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    s3bucket.upload(params, async (err, data) => {
      if (err) {
        return res.status(500).json('S3 upload error');
      } else {
        const newFileUploaded = {
          name: file.originalname,
          url: `${s3FileUrl}${user.email}`,
        };

        user.avatar = newFileUploaded;

        await user.save();
        res.status(200).json(user);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
