const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');

router.post('/add', auth, (req, res) => {
  const members = req.body;
  console.log('members:', members);

  try {
    //check to see if conversation exists
    let conversation = Conversation.find({ members });

    if (conversation)
      return res.status(400).send('Conversation already exists');

    conversation = new Conversation({
      members, // array
      messages: [],
    });
  } catch (err) {}

  //   for (const conversation of conversations) {
  //     const updatedConversations = conversation.members.map(async (member) => {
  //       if (member._id.toString() !== userId) {
  //         const guest = await User.findById(member._id);
  //         member.name = guest.name;
  //         member.email = guest.email;
  //         if (member.avatar) member.avatar = guest.avatar.url;
  //       }
  //     });
  //   }
});

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

router.delete('/delete/:id', (req, res) => {});

module.exports = router;
