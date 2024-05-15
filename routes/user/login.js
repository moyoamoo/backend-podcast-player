const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets.js");
const { getRandom } = require("../../utils.js");
const connectMySQL = require("../../mysql/driver.js");
const { addToken, findUser, replaceTempId } = require("../../mysql/queries.js");
const { userID } = require("../../config.js");

router.post("/", async (req, res) => {
  console.log("i ran");
  let { email, password } = req.body;

  //hash password
  password = sha256(password + salt);

  //search for user
  const results = await connectMySQL(findUser, [email, password]);

  //if there are more than one users in array, generate token, store token
  if (results.length > 0) {
    const token = getRandom();

    if (req.tempUserId) {
      await connectMySQL(replaceTempId, [req.authedUserID, req.tempUserId]);
      res.send({ status: 1, token, replaceTempId: true });
    }

    await connectMySQL(addToken, [results[0].id, token]);
    res.send({ status: 1, token, replaceTempId: false, email: results[0].email});
    return;
  }

  res.send({ status: 0, reason: "bad creds" });
});

module.exports = router;
