const express = require("express");
const router = express.Router();
const axios = require("axios");
const { geoApiKey } = require("../../config");

router.get("/", async (req, res) => {
  const { lat, lon } = req.headers;
  console.log(lat, lon);
  try {
    const { data } = await axios.get(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${geoApiKey}`
    );

    const country = data.address.country.replaceAll(" ", "_").toUpperCase();

    res.send({ status: 1, data: country });
  } catch (e) {
    res.send({ status: 0 });
  }
});

module.exports = router;
