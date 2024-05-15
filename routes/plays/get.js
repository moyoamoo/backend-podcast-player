const express = require("express");
const connectMySQL = require("../../mysql/driver");
const { checkUser } = require("../../middleware");
const { rankList } = require("../../utils");
const router = express.Router();

router.get("/:num", checkUser, async (req, res) => {
  let { num } = req.params;
  num = Number(num);
  let uuids = [];
  let podcasts = {};

  async function getData(uuid) {
    try {
      //select podcasts
      const results = await connectMySQL(
        `SELECT position, duration
          FROM playback_log
            WHERE user_id LIKE ? 
              AND podcast_uuid LIKE ?`,
        [req.authedUserID, uuid]
      );
     

      //round length divided by duration
      podcasts[uuid] = (results.length / results[0].duration).toFixed(1);

      //put in object when on last iteration of loop
      if (uuid === uuids[uuids.length - 1]) {
        const rankedPodcasts = Object.fromEntries(
          Object.entries(podcasts).sort(([, a], [, b]) => b - a)
        );
        let newRanked = {};

        //change length of object
        if (Object.keys(rankedPodcasts).length >= num) {
          for (let i = 0; i < num; i++) {
            newRanked[Object.keys(rankedPodcasts)[i]] =
              Object.values(rankedPodcasts)[i];
         
          }
          res.send({ status: 1, data: newRanked });
          return;
        } else if (Object.keys(rankedPodcasts).length < num - 1)  {
          res.send({
            status: 1,
            data: rankedPodcasts,
            reason: "not enough results",
          });
          return;
        }

        // res.send({ status: 1, data: rankedPodcasts });
      }
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

    uuids.forEach((uuid) => {
      getData(uuid);
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
