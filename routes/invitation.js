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
    if (invitation.status !== "pending") {
      res
        .status(400)
        .json({ msg: `Invitation status already ${invitation.status}` });
    }

    invitation.status = "approved";

    await invitation.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//PUT request to reject invitation
router.put("/:id/reject", async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);

    if (!invitation) {
      res.status(404).send("Invitation not found");
    }

    if (invitation.status !== "pending") {
      res
        .status(400)
        .json({ msg: `Invitation status already ${invitation.status}` });
    }

    invitation.status = "rejected";

    await invitation.save();

    res.json(invitation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
