// Setup mongoose
const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dbConnector = require('../database/dbConnector'),
    secrets = require('../../resources/secrets').dev;
mongoose.Promise = global.Promise;

// Create schema
const spotifyCredentialSchema = new Schema({
    access_token: String,
    refresh_token: String,
    client_id: String,
    client_secret: String
});

let connection = null;

// Return the spotifyCredential mongo model
let getModel = (connection) => {
    return dbConnector.getModel(spotifyCredentialSchema, 'spotifyCredential', connection);
};

let Credential = getModel(connection);

// Update Access Token in DB
let updateAccessToken = (accessToken) => {
    Credential.findOneAndUpdate(
        { client_id: secrets.spotify.client_id},
        { $set: {access_token: accessToken }},
        err => {
            if (err) throw err;
        }
    );
};

// Get Access Token from the DB.
// Returns a Promise
let getAccessToken = () => {
    return new Promise((fulfill, reject) => {
        Credential.findOne(
            { client_id: secrets.spotify.client_id },
            'access_token'
        ).then(creds => {
            if (creds !== null) {
                fulfill(creds.access_token);
            } else {
                fulfill(null);
            }
        }).catch(err => {
            reject(err);
        });
    });
};

// Get Access Token from the DB.
// Returns a Promise
let getRefreshToken = () => {
    return new Promise(async (fulfill, reject) => {
        Credential.findOne(
            { client_id: secrets.spotify.client_id },
            'refresh_token'
        ).then(creds => {
            if (creds != null) {
                fulfill(creds.refresh_token);
            } else {
                fulfill(null);
            }
        }).catch(err => {
            reject(err);
        });
    });
};

// Exports
module.exports = {
    getModel: getModel,
    updateAccessToken: updateAccessToken,
    getAccessToken: getAccessToken,
    getRefreshToken: getRefreshToken
};
