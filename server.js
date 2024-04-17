const express = require("express");
const app = express();
const cors = require("cors");

// app.use(express.static("public"));

//manage headers
app.use(express.json());

app.use(cors());

//search podcast
app.use("/search", require("./routes/proxy/get"));
//add episodes
app.use("/episodes", require("./routes/proxy/add"));

//genre routes
app.use("/genre/add", require("./routes/genres/add"));
app.use("/genres/get", require("./routes/genres/get"));

// listened podcasts routes
app.use("/listened/add", require("./routes/listened/add"));

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

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
