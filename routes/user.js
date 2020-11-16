const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const Invitation = require("../models/Invitation");

sgMail.setApiKey(process.env.EMAIL_KEY);

//GET all user outgoing invitations
router.get("/:id/invitations/out", async (req, res) => {
  const userId = req.params.id;
  try {
    const invites = await Invitation.find({ referrer: userId });

    if (invites.length < 1) {
      res.status(404).send("No invitations found.");
    }

    res.json(invites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//GET all user incoming invitations
router.get("/:id/invitations/in", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
    }

    const invites = await Invitation.find({ toEmail: user.email });

    if (invites.length < 1) {
      res.status(204).send("No invitations found.");
    }

    res.json(invites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//POST create a user invitation
router.post("/:id/invitation", async (req, res) => {
  const referrer = req.params.id;
  try {
    const user = await User.findById(referrer);

    if (!user) {
      res.status(404).send("User not found");
    }
    const emails = req.body.emailList;

    //for each email create an invitation instance
    for (const email of emails) {
      //determine if referrer already sent invitation to receiver
      const invitations = await Invitation.find({ toEmail: email });

      const invitationAlreadySent = invitations.find(
        (invitation) => invitation.referrer.toString() === referrer
      );

      //can't send invite if already sent but CAN if the invite was rejected
      if (invitationAlreadySent && invitation.status !== "rejected") {
        console.log("Invitation already sent");
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
    res.status(500).send("Server Error");
  }
});

//POST send a user invitation
router.post("/:id/invitation/send", async (req, res) => {
  try {
    //locate user from parameter
    const user = await User.findById(req.params.id);
    console.log("user:", user);

    if (!user) {
      res.status(404).send("User not found");
    }

    const msg = {
      to: req.body.emailList,
      from: "teamcocoapuffs1@gmail.com",
      subject: "Chat-App: A friend has invited you to chat!",
      text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000`,
    };
    console.log("msg:", msg);

    sgMail.send(msg, (err, info) => {
      if (err) {
        return console.error("Email not sent");
      }
      res.json({ msg: "Email sent!" });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
