const getPlaybackData = `SELECT position
                          FROM playback_log
                            WHERE episode_uuid LIKE ?
                              ORDER BY position ASC;`;

module.exports = {
    getPlaybackData
}