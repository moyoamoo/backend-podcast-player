const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "podcast_player",
});

connection.connect();

//calls resolve if works and sends results, calls reject is fails
function connectMySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      resolve(results);
    });
  });
}

module.exports = connectMySQL;
