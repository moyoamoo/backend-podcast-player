const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware");

router.delete("/", checkToken, (req, res) => {
  console.log(req.authedUser);
  delete req.authedUser.email;
  delete req.authedUser.id;
  delete req.authedUser.token;
  delete req.authedUser.password;
  res.send({ status: 1, reason: "User deleted" });
});

module.exports = router;
