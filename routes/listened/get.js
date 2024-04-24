const express = require("express");
const connectMySQL = require("../../mysql/driver");
const { rankList } = require("../../utils");
const { getPlaybackData } = require("../../mysql/queries");

const router = express.Router();

router.get("/", async (req, res) => {
  const { episodeUuid } = req.headers;

  try {
    const results = await connectMySQL(getPlaybackData, [episodeUuid]);

    if (!results.length) {
      res.send({ status: 1, reason: "no listen data" });
      return;
    }

    let positions = [];
    results.forEach((result) => {
      positions.push(result.position);
    });

    const sortedObjTotal = rankList(positions);
    res.send({ status: 1, data: sortedObjTotal });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
