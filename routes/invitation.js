const express = require("express");
const router = express.Router();

router.get("/:id/approve", (req, res) => {
  console.log(req.param.id);
});

router.post("/:id/approve", (req, res) => {
  console.log(req.param.id);
});

router.get("/:id/reject", (req, res) => {
  console.log(req.param.id);
});

router.post("/:id/reject", (req, res) => {
  console.log(req.param.id);
});

module.exports = router;
