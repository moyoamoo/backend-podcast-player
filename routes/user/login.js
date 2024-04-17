const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets.js");
const { getRandom } = require("../../utils.js");
const connectMySQL = require("../../mysql/driver.js");
const { addToken, findUser } = require("../../mysql/queries.js");
const { userID } = require("../../config.js");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  //hash password
  password = sha256(password + salt);

  //search for user
  const results = await connectMySQL(findUser(email, password));

  //if there are more than one users in array, generate token, store token
  if (results.length > 0) {
    const token = getRandom();

    await connectMySQL(addToken(results[0].id, token));
    res.send({ status: 1, token });
    return;
  }

  res.send({ status: 0, reason: "bad creds" });
});

module.exports = router;
