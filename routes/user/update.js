const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { updateUser } = require("../../mysql/queries");

router.patch("/", checkUser, async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing email or password" });
  }

  if (email) {
    await connectMySQL(updateUser("email", email, req.headers.token));
  }
  if (password) {
    await connectMySQL(
      updateUser("password", sha256(password) + salt, req.headers.token)
    );
  }

  res.send({ status: 1 });
});

module.exports = router;
