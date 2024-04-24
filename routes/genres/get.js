const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { getUserGenres } = require("../../mysql/queries");
const { rankList } = require("../../utils");
const router = express.Router();

router.get("/", checkUser, async (req, res) => {
  const { no } = req.params;
  try {
    const results = await connectMySQL(getUserGenres, [req.authedUserID]);

    //if no results
    if (!results.length) {
      res.send({ status: 1, reason: "no favourite genres" });
      return;
    }

    //if results
    if (results.length) {
      let genres = [];

      //put in array
      results.forEach((result) => {
        genres.push(result.genre);
      });

      //turn array into object
      const rankedGenres = rankList(genres);

      res.send({ status: 1, data: rankedGenres });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
});

module.exports = router;
