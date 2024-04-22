const express = require("express");
const { checkUser } = require("../../middleware");
const router = express.Router();

router.get("/", checkUser, (req, res) => {
  const favGenres = rankList(req.authedUser.library);

  res.send({ status: 1, favGenres: favGenres });
});

module.exports = router;