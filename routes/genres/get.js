const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { getUserGenres } = require("../../mysql/queries");
const { rankList } = require("../../utils");
const router = express.Router();

router.get("/", checkUser, async (req, res) => {
  try {
    const results = await connectMySQL(getUserGenres, [req.authedUserID]);

    if (results.length) {
      let genres = [];

      results.forEach((result) => {
        genres.push(result.genre);
      });

      const rankedGenres = rankList(genres);
      res.send({ status: 1, data: rankedGenres });
    } else {
      res.send({ status: 1, reason: "no favourite genres" });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
});

module.exports = router;
