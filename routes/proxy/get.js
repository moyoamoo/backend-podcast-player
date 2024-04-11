const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("../../config");

router.get("/", async (req, res) => {
  const { searchterm, page, order } = req.headers;
  console.log(req.headers)
  try {
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

    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;

