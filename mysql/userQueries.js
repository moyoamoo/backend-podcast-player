const addUser = `INSERT INTO users
                  (email, password)
                    VALUES
                      (?, ?);`;

const getUser = `SELECT *
                  FROM users
                    JOIN sessions ON users.id = sessions.user_id
                      WHERE token LIKE "?;`;

const findUser = `SELECT * FROM users
                    WHERE email LIKE ?
                        AND password LIKE ?`;

const deleteUser = `DELETE users, sessions FROM users
                      JOIN sessions ON users.id = sessions.user_id
                        WHERE token LIKE ?;`;

const checkToken = `SELECT users.id
                        FROM users
                            JOIN sessions ON users.id = sessions.user_id
                                WHERE token LIKE ?;`;

const addToken = `INSERT INTO sessions
                    (user_id, token)
                        VALUES
                            (?, ?);`;

const deleteToken = `DELETE FROM sessions
                      WHERE token LIKE ?;`;

const replaceTempId = `UPDATE INTO playback_log
                          SET user_id LIKE ?
                            WHERE temp_user_id LIKE ?;`;

const updateEmail = `UPDATE users
                        JOIN sessions ON users.id = sessions.user_id
                            SET new_email = ?
                                WHERE sessions.token LIKE ?;`;

const updatePassword = `UPDATE users
                            JOIN sessions ON users.id = sessions.user_id
                                SET password = ?
                                    WHERE sessions.token LIKE ?;`;

const addAuthedUserListenData = `INSERT INTO playback_log
                                  (uuid, user_id, position, duration)
                                    VALUES
                                      (?, ?, ?, ?);`;

const addGuestUserListenData = `INSERT INTO playback_log
                                  (uuid, temp_user_id, position, duration)
                                    VALUES
                                      (?, ?, ?, ?);`;

module.exports = {
  addUser,
  findUser,
  deleteUser,
  getUser,
  checkToken,
  updateEmail,
  updatePassword,
  addToken,
  deleteToken,
  replaceTempId,
  addAuthedUserListenData,
  addGuestUserListenData,
};
