const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

//POST a new conversation
router.post('/add', auth, async (req, res) => {
  const members = req.body;

  const memberIDs = members.map((member) => member._id);

  try {
    //check to see if conversation exists
    let conversation = await Conversation.findOne({
      'members._id': { $all: memberIDs },
    });

    //if conversation already exists
    if (conversation) return res.status(409).json(conversation);

    conversation = new Conversation({
      members,
      messages: [],
    });

    await conversation.save();
    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//GET a single conversation
router.get('/', auth, async (req, res) => {
  const memberIDs = req.query.members.split(',');

  try {
    //check to see if conversation exists
    let conversation = await Conversation.findOne({
      'members._id': { $all: memberIDs },
    });
    if (!conversation) return res.status(404).send('Conversation not found');

    for (const member of conversation.members) {
      const memberData = await User.findById(member._id);

      member.name = memberData.name;
      member.email = memberData.email;
      member.avatar = memberData.avatar.url;
      member.primaryLanguage = memberData.primaryLanguage;
    }

    await conversation.save();
    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//UPDATE a conversation's messages to read status
router.put('/read/:id', auth, async (req, res) => {
  const conversationId = req.params.id;

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) return res.status(404).send('Conversation not found');

    const messagesRead = conversation.messages.map((msg) => {
      if (msg.isRead === false) msg.isRead = true;
      return msg;
    });

    conversation.messages = messagesRead;
    await conversation.save();
    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

router.get('/')

router.delete('/delete/:id', (req, res) => {});



module.exports = router;
