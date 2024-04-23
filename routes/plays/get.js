const express = require("express");
const connectMySQL = require("../../mysql/driver");
const { checkUser } = require("../../middleware");
const { rankList } = require("../../utils");
const router = express.Router();

router.get("/", checkUser, async (req, res) => {
  let uuids = [];
  let podcasts = {};

  async function getData(uuid) {
    try {
      const results = await connectMySQL(
        `SELECT position, duration
          FROM playback_log
            WHERE user_id LIKE ? 
              AND podcast_uuid LIKE ?`,
        [req.authedUserID, uuid]
      );
      // console.log(data)
      podcasts[uuid] = (results.length / results[0].duration).toFixed(1);

      if (uuid === uuids[uuids.length - 1]) {
        const rankedPodcasts = Object.fromEntries(
          Object.entries(podcasts).sort(([, a], [, b]) => b - a)
        );
        res.send({ status: 1, data: rankedPodcasts });
      }
      console.log(podcasts);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const results = await connectMySQL(
      `SELECT podcast_uuid, position, duration
            FROM playback_log
                WHERE user_id LIKE ?;`,
      [req.authedUserID]
    );

    if (!results.length) {
      res.send({ status: 1, reason: "no listen data" });
      return;
    }

    // console.log(results)
    results.forEach((result) => {
      if (!uuids.includes(result.podcast_uuid)) {
        uuids.push(result.podcast_uuid);
      }
    });
    console.log(uuids);

    uuids.forEach((uuid) => {
      getData(uuid);
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
