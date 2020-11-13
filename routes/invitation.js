const express = require("express");
const router = express.Router();
const Invitation = require("../models/Invitation");

//PUT request to approve invitation
router.put("/:id/approve", async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);

    if (!invitation) {
      res.status(404).send("Invitation not found");
    }

    invitation.status = "approved";

    await invitation.save();

    res.json(invitation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//PUT request to reject invitation
router.put("/:id/reject", async (req, res) => {
  try {
    try {
      const invitation = await Invitation.findById(req.params.id);

      if (!invitation) {
        res.status(404).send("Invitation not found");
      }

      invitation.status = "rejected";

      await invitation.save();

      res.json(invitation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
