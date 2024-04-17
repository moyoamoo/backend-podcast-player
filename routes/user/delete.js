const express = require("express");
const router = express.Router();
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { deleteUser } = require("../../mysql/queries");

router.delete("/", checkUser, async (req, res) => {
  await connectMySQL(deleteUser(req.headers.token));
  res.send({ status: 1 });
});

module.exports = router;
