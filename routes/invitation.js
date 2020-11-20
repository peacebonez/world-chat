const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const User = require('../models/User');
const auth = require('../middleware/auth');

//PUT request to approve invitation PRIVATE ROUTE
router.put('/:id/approve', auth, async (req, res) => {
  const invitationId = req.params.id;
  try {
    const invitation = await Invitation.findById(invitationId);

    //check if invitation exists
    if (!invitation) {
      res.status(404).send('Invitation not found');
    }

    //change status to approved if pending
    if (invitation.status === 'pending') {
      invitation.status = 'approved';

      //check if sender has an invitatio from receiver

      //if so, conver their invitation to approved too.
    } else {
      return res
        .status(400)
        .json({ msg: `Invitation status already ${invitation.status}` });
    }

    const sender = await User.findById(invitation.referrer);

    if (!sender) {
      return res.status(404).send('User not found');
    }

    const receiver = await User.findOne({ email: invitation.toEmail });

    //receiver is not a member of the platform
    if (!receiver) {
      // TODO: APPROVE NEW USER INVITE
      console.log('new user approval');
    }

    //receive is already a member and this is a friend request
    else {
      //push receiver into sender's contacts and vice versa

      //copies omit password
      let receiverCopy = {
        _id: receiver._id,
        email: receiver.email,
        name: receiver.name,
        primaryLanguage: receiver.primaryLanguage,
        dateJoined: receiver.dateJoined,
      };

      let senderCopy = {
        _id: sender._id,
        email: sender.email,
        name: sender.name,
        primaryLanguage: sender.primaryLanguage,
        dateJoined: sender.dateJoined,
      };

      console.log('receiverCopy:', receiverCopy);
      console.log('senderCopy:', senderCopy);

      //if sender or receiver are already friends
      const alreadyFriends1 = sender.contacts.find(
        (friend) => friend.email.toString() === receiver.email,
      );
      const alreadyFriends2 = receiver.contacts.find(
        (friend) => friend.email.toString() === sender.email,
      );

      console.log('alreadyFriends1:', alreadyFriends1);
      console.log('alreadyFriends2:', alreadyFriends2);
      if (!alreadyFriends1 && !alreadyFriends2) {
        sender.contacts.push(receiverCopy);
        receiver.contacts.push(senderCopy);
      } else {
        return res.status(400).json({ msg: 'Users already connected' });
      }
    }

    await sender.save();
    await receiver.save();
    await invitation.save();

    res.status(200).json({ invitation, sender, receiver });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//PUT request to reject invitation PRIVATE ROUTE
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);

    if (!invitation) {
      res.status(404).send('Invitation not found');
    }

    if (invitation.status === 'pending') {
      invitation.status = 'rejected';
    } else {
      res
        .status(400)
        .json({ msg: `Invitation status already ${invitation.status}` });
    }

    await invitation.save();
    res.status(200).json({ invitation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
