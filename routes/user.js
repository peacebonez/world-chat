const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const Invitation = require("../models/Invitation");

sgMail.setApiKey(process.env.EMAIL_KEY);

//POST create a user invitation
router.post(
  "/:id/invitation",
  [check("toEmail", "Email required").isEmail().trim()],
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
        return res.status(404).json({ msg: "User not found", toEmail });
      }

      //find all outgoing invitations to the toEmail (array)
      const invitations = await Invitation.find({ toEmail });

      //see if an invitation was alreasdy sent from user to toEmail
      const invitationAlreadySent = invitations.find(
        (invitation) => invitation.referrer.toString() === referrer
      );

      console.log("invitationAlreadySent:", invitationAlreadySent);

      //can't send invite if already sent
      if (invitationAlreadySent) {
        console.log("INVITE ALREADY SENT");
        return res
          .status(400)
          .json({ msg: "Invitation already sent", toEmail });
      } else {
        const newInvitation = new Invitation({
          referrer: user,
          toEmail,
        });

        await newInvitation.save();
        res.status(200).json({ msg: "Invitation sent!", toEmail });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//POST send a user invitation
router.post("/:id/invitation/send", async (req, res) => {
  const toEmail = req.body.toEmail;
  try {
    //locate user from parameter
    const user = await User.findById(req.params.id);
    console.log("user:", user);

    if (!user) {
      res.status(404).json({ msg: "User not found", toEmail });
    }

    const msg = {
      to: toEmail,
      from: "teamcocoapuffs1@gmail.com",
      subject: "Chat-App: A friend has invited you to chat!",
      text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000/register`,
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
