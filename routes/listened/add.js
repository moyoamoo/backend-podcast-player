const express = require("express");
const { checkToken } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const router = express.Router();

router.post("/", checkToken, async (req, res) => {
  let { uuid, playbackPosition, podcastDuration } = req.body;


  if (!uuid || typeof uuid != "string" || uuid.length != 36) {
    res.send({ status: 0, reason: "invalid uuid" });
    return;
  }

  await connectMySQL(`INSERT INTO playback_log
                        (uuid, user_id, position)
                          VALUES
                            ("${uuid}", ${req.authedUserID}, ${playbackPosition});`);

  // const foundUuid = req.authedUser.listened[uuid];

  // if (foundUuid) {
  //   foundUuid.date = Date.now();
  //   foundUuid.playbackPosition = playbackPosition;
  //   // req.authedUser.listened.uuid.podcastDuration  = podcastDuration;
  // }

  // if (!foundUuid) {
  //   req.authedUser.listened[uuid]= {
  //     date: Date.now(),
  //     playbackPosition,
  //     podcastDuration,
  //   };
  // }

  res.send({ status: 1, debug: req.authedUser.listened });
});

module.exports = router;
