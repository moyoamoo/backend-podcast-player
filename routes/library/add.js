const express = require("express");
const { checkToken } = require("../../middleware");
const router = express.Router();

router.post("/", checkToken, (req, res) => {
  console.log(req.body);
  let { uuid } = req.body;

  if (typeof uuid != "string") {
    res.send({ status: 0, reason: "invalid uuid" });
    return;
  }

  if (uuid.length < 32) {
    res.send({ status: 0, reason: "invalid length" });
  }

  const duplicate = req.authedUser.library.find((podcast) => {
    return podcast === uuid;
  });

  if (duplicate) {
    res.send({ status: 0, reason: "duplicate podcast" });
    return;
  }

  req.authedUser.library
    ? req.authedUser.library.push(uuid)
    : (req.authedUser.library = [uuid]);
  res.send({ status: 1 });
});

module.exports = router;
