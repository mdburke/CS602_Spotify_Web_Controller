const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let trackSchema = new Schema({
    title: String,
    artist: String,
    imageUri: String,
    album: String,
    trackUri: String,
    artistUri: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = {
    trackSchema: trackSchema
};