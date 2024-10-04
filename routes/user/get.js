const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { getUser } = require("../../mysql/userQueries");
const router = express.Router();

router.get("/", checkUser, async (req, res) => {
  const results = await connectMySQL(getUser, [req.headers.token]);
  res.send({ status: 1, user: results[0] });
});

module.exports = router;
