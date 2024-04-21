const connectMySQL = require("./mysql/driver");
const { checkToken } = require("./mysql/queries");

async function checkUser(req, res, next) {
 
  const results = await connectMySQL(checkToken(req.headers.token));

  if (results.length) {
    req.authedUserID = results[0].id;
    next();
    return;
  }

  if (req.headers.unique) {
    req.tempUserId = req.headers.unique;
    next();
    return;
  }
  res.send({ status: 0, reason: "bad token" });
}

module.exports = { checkUser, checkToken };
