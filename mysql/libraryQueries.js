const getLibrary = `SELECT *
                      FROM library
                        where library.user_id LIKE ?;`;

const addToLibrary = `INSERT INTO library
                      (user_id, uuid)
                        VALUES
                        (?, ?); `;

const deleteFromLibrary = `DELETE FROM library
                            WHERE library.user_id LIKE ? 
                              AND uuid LIKE ?;`;
module.exports = {
  getLibrary,
  addToLibrary,
  deleteFromLibrary,
};
