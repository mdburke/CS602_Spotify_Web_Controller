const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    trackSchema = require('./trackSchema'),
    dbConnector = require('../database/dbConnector');
mongoose.Promise = global.Promise;

const playlistSchema = new Schema({
    playlist_id: String,
    user_id: String,
    tracks: [trackSchema]
});

let getModel = (connection) => {
    return dbConnector.getModel(playlistSchema, "playlists", connection);
};

module.exports = {
    getModel: getModel()
};