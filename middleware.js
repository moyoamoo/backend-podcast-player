function checkToken(req, res, next) {
  const user = req.users.find((user) => {
    console.log(user.token);

    return user.token.find((token) => {
      console.log(token.token, req.headers.token);
      return token.token === Number(req.headers.token);
    });
  });

  if (user) {
    req.authedUser = user;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkToken };
