const express = require("express");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();

router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const query = `UPDATE users
                    SET email = ?
                     WHERE new_email = ? `;

    const results = await connectMySQL(query, [email, email]);
    console.log(results);

    res.send(`<h1>Email has been updated</h1>`);
  } catch (e) {
    console.log(e);
    // res.send(`<h1>Email has been updated</h1>`);
  }
});

module.exports = router;
