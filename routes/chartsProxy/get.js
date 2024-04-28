const express = require("express");
const router = express.Router();
const axios = require("axios");
const connectMySQL = require("../../mysql/driver");

const { apiKey, endPoint, userID } = require("../../config");

router.get("/", async (req, res) => {
  const { country } = req.headers;
  try {
    const cache = await connectMySQL(
      `SELECT chart FROM charts_country_cache
          WHERE country LIKE ?`,
      [country]
    );

    console.log(cache);

    if (cache.length) {
      const str = Buffer.from(cache[0].chart, "base64");
      res.send(str.toString("utf8"));
      return;
    }

    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            getTopChartsByCountry(taddyType:PODCASTSERIES, country:UNITED_KINGDOM){
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

    let position = 1;
    data.data.getTopChartsByCountry.podcastSeries.forEach((podcast) => {
      podcast.position = position++;
    });

    // change to b64
    const b64 = Buffer.from(JSON.stringify(data), "utf8");

    // send to cache table
    await connectMySQL(
      `INSERT INTO charts_country_cache
        (country, chart, top_charts_id)
            VALUES
             (?, ?, ?);`,
      [
        country,
        b64.toString("base64"),
        data.data.getTopChartsByCountry.topChartsId,
      ]
    );
    res.send(data);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

module.exports = router;
