const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/:members', auth, async (req, res) => {
  const memberEmails = req.params.members.split('&');
  const membersFromDb = [];

  try {
    for (const email of memberEmails) {
      const foundMember = await User.findOne({ email });
      if (foundMember) membersFromDb.push(foundMember);
      else return res.status(404).json({ msg: `User ${email} not found` });
    }

    const conversation = new Conversation({
      members: membersFromDb,
    });

    await conversation.save();

    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
