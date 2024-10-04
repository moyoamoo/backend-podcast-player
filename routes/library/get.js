const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { getLibrary } = require("../../mysql/libraryQueries");
const router = express.Router();

router.get("/", checkUser, async (req, res) => {
  try {
    let library = [];
    const results = await connectMySQL(getLibrary, [req.authedUserID]);
    results.forEach((result) => {
      library.push(result.uuid);
    });
    res.send({ status: 1, data: library });
  } catch (e) {
    res.send({ status: 0, reason: "no podcasts in library" });
  }
});

module.exports = router;
