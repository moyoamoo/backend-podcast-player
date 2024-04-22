const express = require("express");
const connectMySQL = require("../../mysql/driver");
const { rankList } = require("../../utils");
const { getPlaybackData } = require("../../mysql/queries");

const router = express.Router();

router.get("/", async (req, res) => {
  const { uuid } = req.headers;

  if (!uuid || typeof uuid != "string" || uuid.length <= 32) {
    res.send({ status: 0, reason: "invalid uuid" });
    return;
  }

  try {
    const results = await connectMySQL(getPlaybackData, [uuid]);

    if (!results.length) {
      res.send({ status: 1, reason: "no listen data" });
      return;
    }

    let positions = [];
    results.forEach((result) => {
      positions.push(result.position);
    });

    const sortedObjTotal = rankList(positions);
    console.log(sortedObjTotal);
    res.send({ status: 1, data: sortedObjTotal });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
