const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { addSearchTerm } = require("../../mysql/searchQueries");
const router = express.Router();

router.get("/", checkUser, async (req, res) => {
  const { searchterm: searchTerm } = req.headers;
  console.log(searchTerm, req.authedUserID);

  if (!searchTerm) {
    res.send({ status: 0, reason: "no search term" });
    return;
  }

  try {
    await connectMySQL(
      addSearchTerm,
      [req.authedUserID, searchTerm]
    );
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
