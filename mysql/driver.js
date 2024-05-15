const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "podcast_player",
// });

// const connection = mysql.createConnection({
//   host: "podlaunch.co.uk",
//   user: "podlaunc_podcast_player",
//   password: "&T)pdp*^,A_[",
//   database: "podlaunc_podcast_player",
// });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

//calls resolve if works and sends results, calls reject is fails
function connectMySQL(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = connectMySQL;
