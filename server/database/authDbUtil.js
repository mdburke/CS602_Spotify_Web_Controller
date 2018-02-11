// Setup mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const secrets = require('../resources/secrets').dev;

// Create schema
const spotifyCredential = new Schema({
    access_token: String,
    refresh_token: String,
    client_id: String,
    client_secret: String
});

let model = null;
let connection = null;

let getModel = (connection) => {
    if (connection === null) {      // If no connection yet, create and return a new one.
        console.log("Creating connection and model...");
        connection = require('./dbConnection').getConnection();
        model = connection.model("spotifyCredential", spotifyCredential);
    }
    return model;
};

let getConnection = () => {
    if (connection === null) {      // If no connection yet, create and return a new one.
        console.log("Creating connection...");
        connection = require('./dbConnection').getConnection();
    }
    return connection;
};

let updateAccessToken = (accessToken) => {
    let Credential = getModel(connection);

    let response = Credential.findOneAndUpdate(
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
    let Credential = getModel(connection);

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
    let Credential = getModel(connection);

    return new Promise((fulfill, reject) => {
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
