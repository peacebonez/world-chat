const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

const sgMail = require("@sendgrid/mail");
const User = require("../models/User");

sgMail.setApiKey(process.env.EMAIL_KEY);

router.post("/user/:id/invitation", [], async (req, res) => {
  const user = await User.findById(req.params.id);
  const msg = {
    to: req.body.emails,
    from: user.email,
    subject: "Chat-App: A friend has invited you to chat!",
    text: "Hey! join our platform at http://localhost:3000",
  };

  sgMail.send(msg, (err, info) => {
    if (err) {
      return console.error("Email not sent");
    }
    console.log("Email sent successfully!");
  });
});

// const msg = {
//   to: ["kevin@rentopiagroup.com", "kmpariso12@gmail.com"],
//   from: "teamcocoapuffs1@gmail.com",
//   subject: "Chat-App: A friend has invited you to chat!",
//   text: "Hey! join our platform at http://localhost:3000",
// };
