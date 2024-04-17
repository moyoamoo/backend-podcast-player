const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("../../config");

router.get("/", async (req, res) => {
  const { uuid, order, page } = req.headers;
  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
          getPodcastSeries(uuid: "${uuid}"){
            uuid
            genres
            name
            description
            imageUrl
            totalEpisodesCount
            episodes(sortOrder: ${order}, page:${page}, limitPerPage:10){
            name 
            uuid
            description
            audioUrl
            datePublished
           }
          }
        }`,
      },
      {
        headers: {
          "X-USER-ID": userID,
          "X-API-Key": apiKey,
        },
      }
    );
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
