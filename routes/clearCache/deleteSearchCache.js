const express = require("express");
const connectMySQL = require("../../mysql/driver");

router.delete("/", async (res, req) => {
  const emptyCacheSearch = `TRUNCATE TABLE
                                    search_cache`;

  try {
    await connectMySQL(emptyCacheSearch);
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "could not clear cache" });
  }
});

module.exports = router;
