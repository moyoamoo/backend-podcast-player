const express = require("express");
require("dotenv").config()
const router = express.Router();
const axios = require("axios");
const connectMySQL = require("../../mysql/driver");
const { apiKey, endPoint, userID } = require("../../config");
const { getSearchCache, addSearchCache } = require("../../mysql/cacheQueries");

router.get("/", async (req, res) => {
  let { searchterm, page, order } = req.headers;
  console.log(typeof page, typeof order);

  page = Number(page);

  try {
    // search for term in cache
    const cache = await connectMySQL(getSearchCache, [searchterm, page, order]);

    // if in cache send, conver to string and then JSON
    if (cache.length) {
      const str = Buffer.from(cache[0].response, "base64");
      const data = JSON.parse(str.toString("utf8"));
      res.send({ status: 1, data: data.data });
      return;
    }

    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            searchForTerm(term:"${searchterm}", filterForTypes:PODCASTSERIES, searchResultsBoostType:BOOST_POPULARITY_A_LOT, isSafeMode:true, page: ${page}){
              searchId
              podcastSeries{
                genres
                uuid
                name
                description
                imageUrl
                totalEpisodesCount
                episodes(sortOrder:${order}, page: 1, limitPerPage: 10){
                    uuid
                    name
                    description
                    datePublished
                    audioUrl
                  }
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

    // change to b64
    const b64 = Buffer.from(JSON.stringify(data), "utf8");

    // send to cache table
    await connectMySQL(addSearchCache, [
      searchterm,
      b64.toString("base64"),
      page,
      order,
    ]);

    res.send({ reason: 1, data });
  } catch (e) {
    res.send({ status: 0, reason: "data not found" });
  }
});

module.exports = router;
