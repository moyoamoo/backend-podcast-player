const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { getUserGenres } = require("../../mysql/queries");
const { rankList } = require("../../utils");
const router = express.Router();

router.get("/:num", checkUser, async (req, res) => {
  let { num } = req.params;
  num = Number(num);
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

      // res.send({ status: 1, data: rankedGenres });

      let newRanked = {};

      //change length of object
      if (Object.keys(rankedGenres).length >= num) {
        for (let i = 0; i < num; i++) {
          newRanked[Object.keys(rankedGenres)[i]] =
            Object.values(rankedGenres)[i];
        }
        res.send({ status: 1, data: newRanked });
        return;
      } else if (Object.keys(rankedGenres).length < num - 1) {
        res.send({
          status: 1,
          data: rankedGenres,
          reason: "not enough results",
        });
        return;
      }
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
});

module.exports = router;
