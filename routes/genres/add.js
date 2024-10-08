const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { addToGenres } = require("../../mysql/genreQueries");
const { formatGenres } = require("../../utils");
const router = express.Router();

router.post("/", checkUser, (req, res) => {
  let { genres } = req.body;

  const formattedGenres = formatGenres(genres);

  async function insertGenres(userID, genre) {
    try {
      await connectMySQL(addToGenres, [userID, genre]);
      res.send({ status: 1 });
    } catch (e) {
      console.log(e);
      res.send({ status: 0 });
    }
  }

  formattedGenres.forEach((genre) => {
    insertGenres(req.authedUserID, genre);
  });
});

module.exports = router;
