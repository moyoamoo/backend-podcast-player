const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getRandom } = require("../../utils");
const connectMySQL = require("../../mysql/driver");
const { addUser, addToken } = require("../../mysql/queries");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  //hash password
  password = sha256(password + salt);

  //create token
  const token = getRandom();

  //insert user, password,, token  into the DB, catch error
  try {
    const result = await connectMySQL(addUser(email, password));

    await connectMySQL(addToken(result.insertId, token));

    res.send({ status: 1, token });
  } catch (e) {
    console.log(e);
    res.send({ status: 1, reason: "Duplicate user" });
  }
});

module.exports = router;
