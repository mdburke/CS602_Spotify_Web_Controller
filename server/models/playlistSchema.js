const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    trackSchema = require('./trackSchema');
mongoose.Promise = global.Promise;

let model = null;
let connection = null;

const playlistSchema = new Schema({
    playlist_id: String,
    user_id: String,
    tracks: [trackSchema]
});

let getModel = (connection) => {
    if (connection === null || connection === undefined) {      // If no connection yet, create and return a new one.
        connection = require('../database/dbConnection').getConnection();
        model = connection.model("playlists", playlistSchema);
    }
    return model;
};

module.exports = {
    getModel: getModel()
};