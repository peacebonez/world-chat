const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const Invitation = require("../models/Invitation");

sgMail.setApiKey(process.env.EMAIL_KEY);

//POST create a user invitation
router.post("/:id/invitation", async (req, res) => {
  const referrer = req.params.id;
  const toEmail = req.body.toEmail;

  try {
    const user = await User.findById(referrer);

    if (!user) {
      res.status(404).json({ msg: "User not found", toEmail });
    }

    //determine if referrer already sent invitation to receiver
    const invitations = await Invitation.find({ toEmail });

    const invitationAlreadySent = invitations.find(
      (invitation) => invitation.referrer.toString() === referrer
    );

    //can't send invite if already sent but CAN if the invite was rejected
    if (invitationAlreadySent && invitation.status !== "rejected") {
      res.status(400).json({ msg: "Invitation already sent", toEmail });
    } else {
      const newInvitation = new Invitation({
        referrer: user,
        toEmail: email,
      });

      await newInvitation.save();
      res.json(newInvitation);
    }
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
      res.status(404).json({ msg: "User not found", toEmail });
    }

    const msg = {
      to: req.body.toEmail,
      from: "teamcocoapuffs1@gmail.com",
      subject: "Chat-App: A friend has invited you to chat!",
      text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000`,
    };
    console.log("msg:", msg);

    sgMail.send(msg, (err, info) => {
      if (err) {
        res.status(400).json({ msg: "Email error", toEmail });
      }
      res.status(200).json({ msg: "Email sent!", toEmail });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
