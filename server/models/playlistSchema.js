let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let trackSchema = require('./trackSchema');

let playlistSchema = new Schema({
    playlist_id: String,
    user_id: String,
    tracks: [trackSchema]
});

module.exports = {
    playlistSchema: playlistSchema
};