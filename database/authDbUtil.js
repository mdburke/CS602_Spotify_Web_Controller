// Setup mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Create schema
const spotifyCredential = new Schema({
    access_token: String,
    refresh_token: String,
    client_id: String,
    client_secret: String
});

let model = null;

// Exports
module.exports = {
    getModel: (connection = null) => { // Default param in case user doesn't pass in connection
        if (connection === null) {      // If no connection yet, create and return a new one.
            console.log("Creating connection and model...");
            connection = require('./dbConnection').getConnection();
            model = connection.model("spotifyCredential", spotifyCredential);
        }
        return model;
    }
};
