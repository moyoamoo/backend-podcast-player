const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();
const { removeDuplicates } = require("../../utils");

router.get("/:num", checkUser, async (req, res) => {
  let { num } = req.params;
  num = Number(num);
  console.log(num);

  try {
    console.log(req.authedUserID);
    const results = await connectMySQL(
      `SELECT search_term 
            FROM search
                WHERE user_id LIKE ?; `,
      [req.authedUserID]
    );

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
        reason: "not enough search results",
      });
      return;
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
});

module.exports = router;
