function addUser(email, password) {
  return `INSERT INTO users
            (email, password)
                 VALUES
                    ("${email}", "${password}");`;
}

function findUser(email, password) {
  return `SELECT * FROM users
                WHERE email LIKE "${email}" 
                    AND password LIKE "${password}";`;
}
function addToken(userID, token) {
  return `INSERT INTO sessions
                (user_id, token)
                    VALUES
                        ("${userID}", "${token}");`;
}

function getLibrary(userID) {
  return `SELECT *
                FROM library
                    where library.user_id LIKE ${userID};`;
}

function addToLibrary(userID, uuid) {
  return `INSERT INTO library
                (user_id, uuid)
                    VALUES
                        ("${userID}", "${uuid}");
    `;
}

function addToken(userID, token) {
  return `INSERT INTO sessions
                (user_id, token)
                     VALUES
                        ("${userID}", "${token}");`;
}

function deleteFromLibrary(userID, uuid) {
  return `DELETE FROM library
                WHERE library.user_id LIKE ${userID} AND uuid LIKE "${uuid}";`;
}

function deleteToken(token) {
  return `DELETE FROM sessions
                WHERE token LIKE "${token}";`;
}

function deleteUser(token) {
  return `DELETE users, sessions FROM users
            JOIN sessions ON users.id = sessions.user_id
                WHERE token LIKE "${token}";`;
}

function updateUser(key, value, token) {
  return `UPDATE users
            JOIN sessions ON users.id = sessions.user_id
                SET ${key} = "${value}"
                   WHERE sessions.token LIKE "${token}";`;
}

function checkToken(token) {
  return `SELECT *
            FROM users
                JOIN sessions ON users.id = sessions.user_id
                    WHERE token LIKE "${token}";`;
}

function getUser(token) {
  return `SELECT users.id
            FROM users
                JOIN sessions ON users.id = sessions.user_id
                    WHERE token LIKE "${token}";`;
}

function addToCache(searchTerm, response) {
  return `INSERT INTO cache
            (search_term, response)
               VALUES
                ("${searchTerm}", "${response.toString("base64")}");`;
}


module.exports = {
  addUser,
  addToken,
  deleteToken,
  deleteUser,
  updateUser,
  checkToken,
  getUser,
  addToLibrary,
  deleteFromLibrary,
  getLibrary,
  findUser,
  addToCache
};
