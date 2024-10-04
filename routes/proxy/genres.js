const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("../../config");

router.get("/", async (req, res) => {
  const { genres, page } = req.headers;

  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            getTopChartsByGenres(taddyType:PODCASTSERIES, genres:${genres}, page:${page}){
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
