//create token
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

//convert to base64
function toBase64(data) {
  return Buffer.from(JSON.stringify(data), "utf8");
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

module.exports = { getRandom, rankList, toBase64 };
