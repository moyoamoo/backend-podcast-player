const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send({ status: 1, user: req.users});
});

module.exports = router;
