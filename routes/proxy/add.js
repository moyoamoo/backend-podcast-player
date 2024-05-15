const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("../../config");
const connectMySQL = require("../../mysql/driver");
const { getEpisodeCache, addEpisodeCache } = require("../../mysql/queries");

router.get("/", async (req, res) => {
  const { uuid, order, page } = req.headers;

  try {
    const cache = await connectMySQL(getEpisodeCache, [uuid, page, order]);

    if (cache.length) {
      const str = Buffer.from(cache[0].response, "base64");
      res.send(str.toString("utf8"));
      return;
    }

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

    res.send({ status: 1, data: data });
    // change to b64
    const b64 = Buffer.from(JSON.stringify(data), "utf8");

    // send to cache table
    await connectMySQL(addEpisodeCache, [
      uuid,
      b64.toString("base64"),
      page,
      order,
    ]);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
