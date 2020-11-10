const router = require('express').Router();

router.use(require('./ping'))
router.use('api', require('./user'))

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

module.exports = router;
