const addToGenres = `INSERT INTO genres
                      (user_id, genre)
                        VALUES 
                          (?, ?); `;

const getUserGenres = `SELECT genre FROM genres
                          WHERE user_id like ?;`;
module.exports = {
  addToGenres,
  getUserGenres,
};
