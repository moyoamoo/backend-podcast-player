const express = require("express");
const { checkToken } = require("../../middleware");
const { deleteFromLibrary } = require("../../mysql/queries");
const router = express.Router();

router.delete("/", checkToken, async (req, res) => {
  let { uuid } = req.headers;
  // console.log(uuid);
  // if (typeof uuid != "string") {
  //   res.send({ status: 0, reason: "invalid uuid" });
  //   return;
  // }

  // if (uuid.length < 32) {
  //   res.send({ status: 0, reason: "invalid length" });
  //   return;
  // }

  try {
    await connectMySQL(deleteFromLibrary(req.authedUserID, uuid));
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "no podcast found" });
  }
});

module.exports = router;
