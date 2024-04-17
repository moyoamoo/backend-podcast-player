function getUser(users, email, password) {
  return users.find((user) => {
    return user.email === email && user.password === password;
  });
}

function getRandom(len = 115) {
  let uniqueId = "";
  let chars =
    "ABCDEFGHIJUKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz".split("");
  let charsLength = chars.length;

  for (let i = 0; i < len; i++) {
    chars.sort(() => {
      return 0.5 - Math.random();
    });
    uniqueId += chars[Math.floor(Math.random() * charsLength)];
  }

  return (uniqueId += Date.now());
}

function rankList(arr) {
  let objTotal = {};
  arr.forEach((item) => {
    if (objTotal[item]) {
      objTotal[item] += 1;
    } else {
      objTotal[item] = 1;
    }
  });

  const sortedObjTotal = Object.fromEntries(
    Object.entries(objTotal).sort(([, a], [, b]) => b - a)
  );

  return sortedObjTotal;
}

module.exports = { getRandom, getUser, rankList };
