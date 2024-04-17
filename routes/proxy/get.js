const express = require("express");
const router = express.Router();
const axios = require("axios");
const connectMySQL = require("../../mysql/driver");
const { apiKey, endPoint, userID } = require("../../config");

router.get("/", async (req, res) => {
  const { searchterm, page, order } = req.headers;
  try {
    //search for term in cache
    const cache = await connectMySQL(
      `SELECT response FROM cache where search_term LIKE "${searchterm}";`
    );

    //if in cache send
    if (cache.length) {
      const str = Buffer.from(cache[0].response, "base64");
      res.send(str.toString("utf8"));
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
          "X-USER-ID": userID,
          "X-API-Key": apiKey,
        },
      }
    );

    //change to b64
    const b64 = Buffer.from(JSON.stringify(data), "utf8");

    //send to cache table
    await connectMySQL(`INSERT INTO cache
                          (search_term, response)
                              VALUES
                                ("${searchterm}", "${b64.toString(
      "base64"
    )}");`);
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
