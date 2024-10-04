const express = require("express");
const router = express.Router();
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { deleteToken } = require("../../mysql/userQueries");

router.delete("/", checkUser, async (req, res) => {
  await connectMySQL(deleteToken, [req.headers.token]);
  res.send({ status: 1 });
});

module.exports = router;
