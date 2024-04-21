const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();

router.post("/", checkUser, (req, res) => {
  let { genres } = req.body;

  async function insertGenres(userID, genre) {
    try {
      await connectMySQL(`INSERT INTO genres
      (user_id, genre)
        VALUES 
          ("${userID}", "${genre}"); `);
      res.send({ status: 1 });
    } catch (e) {
      console.log(e);
    }
  }

  genres.forEach((genre) => {
    insertGenres(req.authedUserID, genre);
  });
});

module.exports = router;
