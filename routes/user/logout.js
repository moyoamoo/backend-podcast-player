const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { checkToken } = require("../../middleware");

router.delete("/", checkToken, (req, res) => {
  req.authedUser.token.splice(
    req.authedUser.token.indexOf(req.headers.token, 1)
  );

  res.send({ status: 1 });
});

module.exports = router;
