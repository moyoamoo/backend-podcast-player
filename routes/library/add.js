const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { addToLibrary } = require("../../mysql/queries");
const router = express.Router();

router.post("/", checkUser, async (req, res) => {
  let { uuid } = req.body;

  if (typeof uuid != "string") {
    res.send({ status: 0, reason: "invalid uuid" });
    return;
  }

  if (uuid.length < 32) {
    res.send({ status: 0, reason: "invalid length" });
    return;
  }

  try {
    await connectMySQL(addToLibrary(req.authedUserID, uuid));
    res.send({ status: 1 });
  } catch (e) {
    res.send({ status: 1, reason: "duplicate podcast" });
  }
});

module.exports = router;
