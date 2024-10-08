const express = require("express");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();

router.post("/", checkUser, async (req, res) => {
  let { episodeUuid, podcastUuid, playbackPosition, playbackDuration } =
    req.body;

  if (
    !playbackDuration ||
    !playbackPosition ||
    typeof playbackDuration != "number" ||
    typeof playbackPosition != "number" ||
    typeof playbackDuration === null ||
    typeof playbackPosition === null
  ) {
    res.send({ status: 0, reason: "invalid playback position or duration" });
    return;
  }

  try {
    if (req.authedUserID) {
      await connectMySQL(
        `INSERT INTO playback_log
                          (episode_uuid, podcast_uuid,  user_id, position, duration)
                            VALUES
                              (?, ?, ?, ?, ?);`,
        [
          episodeUuid,
          podcastUuid,
          req.authedUserID,
          playbackPosition,
          playbackDuration,
        ]
      );
    } else {
      await connectMySQL(
        `INSERT INTO playback_log
            (episode_uuid, podcast_uuid, temp_user_id, position, duration)
              VALUES
                (?, ?, ?, ?, ?);`[
          (episodeUuid,
          podcastUuid,
          req.authedUserID,
          playbackPosition,
          playbackDuration)
        ]
      );
    }
    res.send({ status: 1 });
  } catch (e) {
    console.log({ status: 0, reason: "data not found" });
  }
});

module.exports = router;
