const express = require("express");
const router = express.Router();
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { deleteUser } = require("../../mysql/userQueries");
const { deleteAccount } = require("../email/templates");
const { sendEmail } = require("../email/nodemailer");

router.delete("/", checkUser, async (req, res) => {
  const getEmail = `SELECT email
                      FROM users
                        WHERE id = ?`;
                        

  const results = await connectMySQL(getEmail, [req.authedUserID]);

  const email = results[0].email;

  await connectMySQL(deleteUser, [req.headers.token]);
  sendEmail(deleteAccount(email), undefined, [{ email }]);
  res.send({ status: 1 });
});

module.exports = router;
