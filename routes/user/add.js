const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getUser, getRandom } = require("../../utils");

router.post("/", (req, res) => {
  let { users, body, lastUserId } = req;
  let { email, password } = body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  password = sha256(password + salt);

  const user = getUser(users, email, password);

  if (user) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }

  //create user id
  lastUserId.value += Math.floor(Math.random() * 9) + 1;

  //create token
  const token = getRandom();

  const newUser = {
    email,
    password,
    id: lastUserId.value,
    token: [{ token, issueDate: Date.now() }],
    listened: {},
    library: []
  };

  req.users.push(newUser);
  res.send({ status: 1, id: lastUserId.value, token });
});

module.exports = router;
