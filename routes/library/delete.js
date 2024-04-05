const express = require("express");
const { checkToken } = require("../../middleware");
const router = express.Router();

router.delete("/:uuid", checkToken, (req, res) => {
  let { uuid } = req.params;

  if (typeof uuid != "string") {
    res.send({ status: 0, reason: "invalid uuid" });
    return;
  }

  const indexOf = authedUser.library.indexOf(uuid);

  if (!uuid) {
    res.send({ status: 0, reason: "no podcast found" });
    return;
  }

  req.authedUser.library.splice(indexOf, 1);
  res.send({ status: 1 });
});

module.exports = router;