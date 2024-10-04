const express = require("express");
require("dotenv").config();
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("../../config");

router.get("/", async (req, res) => {
  const { country, page } = req.headers;

  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            getTopChartsByCountry(taddyType:PODCASTSERIES, country:${country}, page:${page}, limitPerPage: 4){
                topChartsId
                podcastSeries{
                    uuid
                    name
			        imageUrl
                }
            }
        }`,
      },
      {
        headers: {
          "X-USER-ID": userID,
          "X-API-KEY": apiKey,
        },
      }
    );

    res.send({ status: 1, data: data.data });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "no data found" });
  }
});

module.exports = router;
