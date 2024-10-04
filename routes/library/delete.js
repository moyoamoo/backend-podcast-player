const express = require("express");
const { checkUser } = require("../../middleware");
const { deleteFromLibrary } = require("../../mysql/libraryQueries");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();

router.delete("/", checkUser, async (req, res) => {
  let { uuid } = req.headers;
 
  try {
    await connectMySQL(deleteFromLibrary, [req.authedUserID, uuid]);
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "no podcast found" });
  }
});

module.exports = router;
