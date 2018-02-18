let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let trackSchema = new Schema({
    title: String,
    artist: String,
    imageUri: String,
    album: String,
    trackUri: String,
    artistUri: String
});

module.exports = {
    trackSchema: trackSchema
};