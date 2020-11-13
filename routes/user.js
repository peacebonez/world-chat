const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

const sgMail = require("@sendgrid/mail");
const User = require("../models/User");

sgMail.setApiKey(process.env.EMAIL_KEY);

//POST send a user invitation
router.post("/:id/invitation/send", async (req, res) => {
  try {
    //locate user from parameter
    const user = await User.findById(req.params.id);

    if (!user) {
      res.send("User not found");
    }
    const emails = req.body.emailList;
    const msg = {
      to: emails,
      from: "teamcocoapuffs1@gmail.com",
      subject: "Chat-App: A friend has invited you to chat!",
      text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000`,
    };
    console.log("msg:", msg);

    sgMail.send(msg, (err, info) => {
      if (err) {
        return res.status(400).send("Email not sent");
      }
      res.json({ emails });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
