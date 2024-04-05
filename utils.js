function getUser(users, email, password) {
  return users.find((user) => {
    return user.email === email && user.password === password;
  });
}

function getRandom() {
  return Math.floor(Math.random() * 10000000000000);
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
};


module.exports = { getRandom, getUser, rankList};
