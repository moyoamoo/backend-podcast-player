const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getRandom } = require("../../utils");
const connectMySQL = require("../../mysql/driver");
const { addUser, addToken } = require("../../mysql/queries");
const { sendEmail } = require("../email/nodemailer");
const { welcomeEmail } = require("../email/templates");

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
    const result = await connectMySQL(addUser, [email, password]);
    await connectMySQL(addToken, [result.insertId, token]);
    sendEmail(welcomeEmail(email), undefined, [{ email }]);
    res.send({ status: 1, token, email });
  } catch (e) {
    res.send({ status: 1, reason: "Duplicate user" });
    console.log(e);
  }
});

module.exports = router;
