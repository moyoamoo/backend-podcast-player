function addUser(email, password) {
  return `INSERT INTO users
            (email, password)
                 VALUES
                    ("${email}", "${password}" );`;
}

function addToken(userID, token) {
  return `INSERT INTO sessions
                (user_id, token)
                    VALUES
                        ("${userID}", "${token}");`;
}
module.exports = { addUser, addToken};
