const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();
const { removeDuplicates, rankList } = require("../../utils");
const { getSearchTerms } = require("../../mysql/searchQueries");

router.get("/:num", checkUser, async (req, res) => {
  let { num } = req.params;
  num = Number(num);

  try {
    const results = await connectMySQL(getSearchTerms[req.authedUserID]);

    if (!results.length) {
      res.send({ status: 1, reason: "no search results" });
      return;
    }

    let searchTerms = [];
    results.forEach((result) => {
      searchTerms.push(result.search_term);
    });

    searchTerms = removeDuplicates(searchTerms);

    if (searchTerms.length >= num) {
      searchTerms = searchTerms.slice(0, num);
      res.send({ status: 1, data: searchTerms });
      return;
    } else if (searchTerms.length === num - 1) {
      res.send({ status: 1, data: searchTerms });
      return;
    } else if (searchTerms.length < num - 1) {
      res.send({
        status: 1,
        data: searchTerms,
        reason: "not enough results",
      });
      return;
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
});

module.exports = router;
