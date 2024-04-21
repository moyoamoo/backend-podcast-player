const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();

router.get("/", checkUser, async (req, res) => {
  const { searchTerm } = req.headers;
  try {
    await connectMySQL(`INSERT INTO search
                        (user_id, search_term)
                             VALUES 
                                ("${req.authedID}", "${searchTerm}"); `);
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
