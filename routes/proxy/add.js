const express = require("express");
require("dotenv").config();
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("../../config");
const connectMySQL = require("../../mysql/driver");
const {
  getEpisodeCache,
  addEpisodeCache,
} = require("../../mysql/cacheQueries");

router.get("/", async (req, res) => {
  const { uuid, order, page } = req.headers;
  console.log(typeof page);

  try {
    const cache = await connectMySQL(getEpisodeCache, [uuid, page, order]);

    if (cache.length) {
      const str = Buffer.from(cache[0].response, "base64");
      res.send(JSON.parse(str.toString("utf8")));
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
          "X-USER-ID": process.env.USER_ID,
          "X-API-KEY": process.env.API_KEY,
        },
      }
    );
    
    res.send({ status: 1, data: data});
    // // change to b64
    const b64 = Buffer.from(JSON.stringify(data), "utf8");

    // send to cache table
    await connectMySQL(addEpisodeCache, [
      uuid,
      b64.toString("base64"),
      page,
      order,
    ]);
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "no data found" });
  }
});

module.exports = router;
