const express = require("express");
const { checkToken } = require("../../middleware");
const router = express.Router();

router.get("/", checkToken, (req, res) => {
  const favGenres = rankList(req.authedUser.library);

  res.send({ status: 1, favGenres: favGenres });
});

module.exports = router;