// Setup mongoose
const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    secrets = require('../../resources/secrets').dev;
mongoose.Promise = global.Promise;

// Create schema
const spotifyCredential = new Schema({
    access_token: String,
    refresh_token: String,
    client_id: String,
    client_secret: String
});

let model = null;
let connection = null;

// Return the spotifyCredential mongo model
let getModel = (connection) => {
    if (connection === null) {      // If no connection yet, create and return a new one.
        console.log("Creating connection and model...");
        connection = require('../database/dbConnection').getConnection();
        model = connection.model("spotifyCredential", spotifyCredential);
    }
    return model;
};

let Credential = getModel(connection);

// Return and/or create a db connection
let getConnection = () => {
    if (connection === null) {      // If no connection yet, create and return a new one.
        console.log("Creating connection...");
        connection = require('../database/dbConnection').getConnection();
    }
    return connection;
};

// Update Access Token in DB
let updateAccessToken = (accessToken) => {
    Credential.findOneAndUpdate(
        { client_id: secrets.spotify.client_id},
        { $set: {access_token: accessToken }},
        (err, creds) => {
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
            fulfill(creds.access_token);
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
            fulfill(creds.refresh_token);
        }).catch(err => {
            reject(err);
        });
    });
};

// Exports
module.exports = {
    getModel: getModel,
    getConnection: getConnection,
    updateAccessToken: updateAccessToken,
    getAccessToken: getAccessToken,
    getRefreshToken: getRefreshToken
};
