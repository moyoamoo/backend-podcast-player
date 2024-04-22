const express = require("express");
const router = express.Router();
const axios = require("axios");
const connectMySQL = require("../../mysql/driver");
const { apiKey, endPoint, userID } = require("../../config");
const { getSearchCache, addSearchCache } = require("../../mysql/queries");

router.get("/", async (req, res) => {
  let { searchterm, page, order } = req.headers;
  console.log(typeof page, typeof order);

  page = Number(page);

  try {
    //search for term in cache
    const cache = await connectMySQL(getSearchCache, [searchterm, page, order]);

    //if in cache send
    if (cache.length) {
      const str = Buffer.from(cache[0].response, "base64");
      res.send(str.toString("utf8"));
      return;
    }
    console.log(cache);
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
          "X-USER-ID": userID,
          "X-API-Key": apiKey,
        },
      }
    );

    //change to b64
    const b64 = Buffer.from(JSON.stringify(data), "utf8");

    //send to cache table
    await connectMySQL(addSearchCache, [
      searchterm,
      b64.toString("base64"),
      page,
      order,
    ]);

    console.log(data, "data from api");
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
