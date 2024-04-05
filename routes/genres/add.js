const express = require("express");
const { checkToken } = require("../../middleware");
const router = express.Router();

router.post("/", checkToken, (req, res) => {
  let [genres] = req.headers;

  req.authedUser.genres
    ? req.authedUser.genres.push(...genres)
    : (req.authedUser.genres = [genres]);
  res.send({ status: 1 });
});

module.exports = router;
