const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

const sgMail = require("@sendgrid/mail");
const User = require("../models/User");

sgMail.setApiKey(process.env.EMAIL_KEY);

//POST create a user invitation
router.post("/:id/invitation", async (req, res) => {
  console.log("req.body.emailList:", req.body.emailList);
  try {
    //locate user from paramete
    const user = await User.findById(req.params.id);
    console.log("user:", user);

    if (!user) {
      res.send("User not found");
    }

    //email only sends from teamcocoapuffs1@gmail.com registered with sendgrid
    // from: user.email,
    const msg = {
      to: req.body.emailList,
      from: "teamcocoapuffs1@gmail.com",
      subject: "Chat-App: A friend has invited you to chat!",
      text: "Hey! join our platform at http://localhost:3000",
    };
    console.log("msg:", msg);

    // const msg = {
    //   to: ["kevin@rentopiagroup.com", "kmpariso12@gmail.com"],
    //   from: "teamcocoapuffs1@gmail.com",
    //   subject: "Chat-App: A friend has invited you to chat!",
    //   text: "Hey! join our platform at http://localhost:3000",
    // };

    sgMail.send(msg, (err, info) => {
      if (err) {
        return console.error("Email not sent");
      }
      console.log("Email sent successfully!");
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
