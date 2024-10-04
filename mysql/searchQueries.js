const addSearchTerm = `INSERT INTO search
        (user_id, search_term)
          VALUES
            (?, ?);
            `;
const getSearchTerms = `
    SELECT search_term
        FROM search
            WHERE user_id LIKE ?
                ORDER BY entry_date DESC; `;

module.exports = {
  addSearchTerm,
  getSearchTerms,
};
