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

let _getModel = (connection) => {
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
    let Credential = _getModel(connection);
    console.log("called");

    // Credential.update(
    //     { client_id: secrets.spotify.client_id },
    //     { $set: { access_token: accessToken } }
    // );

    let response = Credential.findOneAndUpdate(
        { client_id: secrets.spotify.client_id},
        { $set: {access_token: accessToken }},
        (err, creds) => {
            if (err) throw err;
        }
    );
    console.log(response);
};

// Exports
module.exports = {
    getModel: _getModel,
    getConnection: getConnection,
    updateAccessToken: updateAccessToken
};
