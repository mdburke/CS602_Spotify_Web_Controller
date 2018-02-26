// Not currently in use. For future use case.

const
    mongoose = require('mongoose'),
    dbConnector = require('../database/dbConnector'),
    Schema = mongoose.Schema;

let trackSchema = new Schema({
    title: String,
    artist: String,
    imageUri: String,
    album: String,
    trackUri: String,
    artistUri: String,
    name: String
    // user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Return the spotifyCredential mongo model
let getModel = (connection) => {
    return dbConnector.getModel(trackSchema, 'tracks', connection);
};

module.exports = {
    trackSchema: trackSchema,
    getModel: getModel
};