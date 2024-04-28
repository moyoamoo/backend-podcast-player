const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("../../config");

router.get("/", async (req, res) => {
  const { country } = req.headers;

  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            getTopChartsByCountry(taddyType:PODCASTSERIES, country:UNITED_STATES_OF_AMERICA){
              topChartsId
              podcastSeries{
                uuid
                name
                description
                imageUrl
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
