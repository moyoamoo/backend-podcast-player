const addUser = `INSERT INTO users
                  (email, password)
                    VALUES
                      (?, ?);`;

const findUser = `SELECT * FROM users
                    WHERE email LIKE ?
                        AND password LIKE ?`;

const getLibrary = `SELECT *
                      FROM library
                        where library.user_id LIKE ?;`;

const addToLibrary = `INSERT INTO library
                      (user_id, uuid)
                        VALUES
                        (?, ?); `;

const addToken = `INSERT INTO sessions
                    (user_id, token)
                      VALUES
                        (?, ?);`;

const deleteFromLibrary = `DELETE FROM library
                            WHERE library.user_id LIKE ? 
                              AND uuid LIKE ?;`;

const deleteToken = `DELETE FROM sessions
                      WHERE token LIKE ?;`;

const deleteUser = `DELETE users, sessions FROM users
                      JOIN sessions ON users.id = sessions.user_id
                        WHERE token LIKE ?;`;

const updateUser = `UPDATE users
                      JOIN sessions ON users.id = sessions.user_id
                        SET ? = ?
                          WHERE sessions.token LIKE ?;`;

const checkToken = `SELECT users.id
                      FROM users
                        JOIN sessions ON users.id = sessions.user_id
                          WHERE token LIKE ?;`;

const getUser = `SELECT *
                  FROM users
                    JOIN sessions ON users.id = sessions.user_id
                      WHERE token LIKE "?;`;

// function addToCache(searchTerm, response) {
//   return `INSERT INTO cache
//             (search_term, response)
//                VALUES
//                 ("${searchTerm}", "${response.toString("base64")}");`;
// }

const getPlaybackData = `SELECT position
                          FROM playback_log
                            WHERE episode_uuid LIKE ?;`;

const addAuthedUserListenData = `INSERT INTO playback_log
                                  (uuid, user_id, position, duration)
                                    VALUES
                                      (?, ?, ?, ?);`;

const addGuestUserListenData = `INSERT INTO playback_log
                                  (uuid, temp_user_id, position, duration)
                                    VALUES
                                      (?, ?, ?, ?);`;

const getEpisodeCache = `SELECT response FROM episode_cache 
                                      WHERE uuid LIKE ?
                                          AND page LIKE ?
                                              AND sort_order LIKE ?;`;

const addEpisodeCache = `INSERT INTO episode_cache
                                      (uuid, response, page, sort_order)
                                          VALUES
                                              (?, ?, ?, ?);`;

const getSearchCache = `SELECT response FROM search_cache 
                          WHERE search_term LIKE ?
                            AND page LIKE ?
                              AND sort_order LIKE ?;`;

const addSearchCache = `INSERT INTO search_cache
                          (search_term, response, page, sort_order)
                              VALUES
                                (?, ?, ?, ?);`;

const addToGenres = `INSERT INTO genres
                      (user_id, genre)
                        VALUES 
                          (?, ?); `;

const getUserGenres = `SELECT genre FROM genres
                          WHERE user_id like ?;`;

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
  getEpisodeCache,
  addEpisodeCache,
  getSearchCache,
  addSearchCache,
  // addToCache,
  getPlaybackData,
  addAuthedUserListenData,
  addGuestUserListenData,
  addToGenres,
  getUserGenres,
};
