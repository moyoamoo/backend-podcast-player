const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router(); 


router.get("/", checkUser, async (req, res) => {
  const { searchterm: searchTerm } = req.headers;
  console.log(searchTerm);

  if (!searchTerm) {
    res.send({ status: 0, reason: "no search term" });
    return;
  }

  try {
    await connectMySQL(`INSERT INTO search
                        (user_id, search_term)
                             VALUES 
                                ("${req.authedUserID}", "${searchTerm}"); `);
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
