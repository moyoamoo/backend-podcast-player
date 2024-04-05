const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiKey, endPoint, userID } = require("config");

router.post("/search", async (req, res) => {
  const { searchTerm, page } = req.headers;

  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            searchForTerm(term:"${searchTerm}", filterForTypes:PODCASTSERIES, searchResultsBoostType:BOOST_POPULARITY_A_LOT, isSafeMode:true, page: ${page}){
              searchId
              podcastSeries{
                genres
                uuid
                name
                hash                         
                childrenHash
                description
                imageUrl
                totalEpisodesCount
                episodes(sortOrder:LATEST, page: 1, limitPerPage: 10){
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
  } catch (error) {
    res.send(error);
  }
});

// router.post("/find/:uuid", (req, res) => {
//   const { uuid, order} = req.params;

//   if (order === "1") {
//     order = "OLDEST";
//   } else {
//     order = "LATEST";
//   }
//   try {
//     const { data } = await axios.post(
//       endPoint,
//       {
//         query: `{
//           getPodcastSeries(uuid: "${uuid}"){
//             uuid
//             genres
//             name
//             hash
//             childrenHash
//             description
//             imageUrl
//             totalEpisodesCount
//             episodes(sortOrder: ${order}, page:${page}, limitPerPage:10){
//             name
//             uuid
//             description
//             audioUrl
//             datePublished
//            }
//           }
//         }`,
//       },
//       {
//         headers: {
//           "X-USER-ID": userID,
//           "X-API-Key": apiKey,
//         },
//       }
//     );
// res.send(data)

//   } catch (error) {
//     console.log(error);
//   }
// });

// module.exports = router;
