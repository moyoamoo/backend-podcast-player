const express = require("express");
const { checkToken } = require("../../middleware");
const router = express.Router();

router.post("/", checkToken, (req, res) => {
  let { uuid, playbackPosition, podcastDuration } = req.body;

  console.log(req.authedUser);
 
  if (!uuid || typeof uuid != "string" || uuid.length != 36) {
    res.send({ status: 0, reason: "invalid uuid" });
    return;
  }

  const foundUuid = req.authedUser.listened[uuid];

  if (foundUuid) {
    foundUuid.date = Date.now();
    foundUuid.playbackPosition = playbackPosition;
    // req.authedUser.listened.uuid.podcastDuration  = podcastDuration;
  }

  if (!foundUuid) {
    req.authedUser.listened[uuid]= {
      date: Date.now(),
      playbackPosition,
      podcastDuration,
    };
  }

  res.send({ status: 1, debug: req.authedUser.listened });
});

module.exports = router;
