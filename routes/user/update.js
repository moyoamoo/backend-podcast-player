const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { checkToken } = require("../../middleware");

router.patch("/", checkToken, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing email or password" });
  }

  if (email) {
    req.authedUser.email = email;
  }
  if (password) {
    req.authedUser.password = sha256(password + salt);
  }

  res.send({ status: 1 });
});

module.exports = router;
