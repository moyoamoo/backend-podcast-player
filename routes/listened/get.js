const express = require("express");
const connectMySQL = require("../../mysql/driver");
const { getPlaybackData } = require("../../mysql/queries");

const router = express.Router();

router.get("/", async (req, res) => {
  const { episode_uuid } = req.headers;
  console.log(episode_uuid);
  try {
    const results = await connectMySQL(getPlaybackData, [episode_uuid]);
    console.log(results);
    if (!results.length) {
      res.send({ status: 1, reason: "no listen data" });
      return;
    }

    let positions = new Array(results[results.length - 1].position + 1).fill(0);

    results.forEach((result) => {
      positions[result.position] += 1;
    });

    const output = {};
    positions.forEach((item, index) => {
      output[index] = item;
    });

    res.send({ status: 1, data: output });
  } catch (e) {
    res.send({ status: 0 });
  }
});

module.exports = router;
