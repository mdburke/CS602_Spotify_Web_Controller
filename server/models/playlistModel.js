const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    trackSchema = require('./trackSchema').trackSchema,
    secrets = require('../../resources/secrets').dev;
    dbConnector = require('../database/dbConnector');
mongoose.Promise = global.Promise;

const playlistSchema = new Schema({
    playlist_id: String,
    user_id: String,
    tracks: [{
        title: String,
        artist: String,
        imageUri: String,
        album: String,
        trackUri: String,
        artistUri: String,
        name: String,
        user: { type: String, default: "anonymous" }
    }]
});

let connection = null;

let getModel = (connection) => {
    return dbConnector.getModel(playlistSchema, "playlists", connection);
};

let Playlist = getModel(connection);

let addToPlaylist = (track) => {
    Playlist.findOneAndUpdate(
        { user_id: secrets.spotify.user_id},        // Find way to use Object ID to be more unique and support multiple playlists
        { $push: {tracks: track }},
        (err, res) => {
            if (err) throw err;
            console.log(res);
            return res;
        }
    );
};

let getTracksInPlaylist = () => {
    return Playlist.findOne({ user_id: secrets.spotify.user_id}, err => {
        if (err) throw err;
    });
};

module.exports = {
    getModel: getModel(),
    addToPlaylist: addToPlaylist,
    getTracksInPlaylist: getTracksInPlaylist
};