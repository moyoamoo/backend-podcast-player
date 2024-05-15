const express = require("express");
const connectMySQL = require("../../mysql/driver");

router.delete("/", async (res, req) => {

    const emptyCacheEpisodes = `TRUNCATE TABLE
                                    episodes_cache`

    try {
        await connectMySQL(emptyCacheEpisodes)
        res.send({status: 1})
    } catch (e) {
        console.log(e)
        res.send({status: 0, reason: "could not clear cache"})
    }

});

module.exports = router;
