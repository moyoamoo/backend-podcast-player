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

module.exports = {
  getEpisodeCache,
  addEpisodeCache,
  getSearchCache,
  addSearchCache,
};
