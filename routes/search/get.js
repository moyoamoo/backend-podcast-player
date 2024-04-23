const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();
const { removeDuplicates } = require("../../utils");

router.get("/", checkUser, async (req, res) => {
  try {
    console.log(req.authedUserID);
    const results = await connectMySQL(
      `SELECT search_term 
            FROM search
                WHERE user_id LIKE ?; `,
      [req.authedUserID]
    );
    let searchTerms = [];
    results.forEach((result) => {
      searchTerms.push(result.search_term);
    });

    searchTerms = removeDuplicates(searchTerms);
    res.send({ status: 1, data: searchTerms });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
