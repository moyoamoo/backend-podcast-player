// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// console.log(process.env);

// app.use(express.static("public"));

//manage headers
app.use(express.json());

app.use(cors());

app.use("/update_email", require("./routes/user/accept"));

//get charts by country
app.use("/top_charts/country", require("./routes/chartsProxy/get"));

//search podcast
app.use("/search", require("./routes/proxy/get"));
//add episodes
app.use("/episodes", require("./routes/proxy/add"));

//get listened for user
app.use("/plays/get", require("./routes/plays/get"));

//user search terms routes
app.use("/search_term/add", require("./routes/search/add"));
app.use("/search_term/get", require("./routes/search/get"));

//genre routes
app.use("/genres/add", require("./routes/genres/add"));
app.use("/genres/get", require("./routes/genres/get"));

// listened podcasts routes
app.use("/listened/add", require("./routes/listened/add"));
app.use("/listened/get", require("./routes/listened/get"));

//library routes
app.use("/library/add", require("./routes/library/add"));
app.use("/library/get", require("./routes/library/get"));
app.use("/library/delete", require("./routes/library/delete"));

//manage user routes
app.use("/login", require("./routes/user/login"));
app.use("/logout", require("./routes/user/logout"));
app.use("/user/get", require("./routes/user/get"));
app.use("/user/add", require("./routes/user/add"));
app.use("/user/delete", require("./routes/user/delete"));
app.use("/user/update", require("./routes/user/update"));

//clear cache
app.use(
  "episodes/cache/delete",
  require("./routes/clearCache/deleteEpisodeCache")
);
app.use(
  "search_term/cache/delete",
  require("./routes/clearCache/deleteSearchCache")
);

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
