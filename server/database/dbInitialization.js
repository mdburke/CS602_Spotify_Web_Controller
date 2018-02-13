// Only used to initialize the database with the creds when first created

// Setup Mongoose/Mongo connection
const connection = require('./dbConnection').getConnection();

// Get Employee constructor/model
const SpotifyCredential = require('../models/spotifyCredentialModel').getModel;

// Get secrets
const secrets = require('../../resources/secrets').dev;

// On connection open, add the creds to the DB
connection.on("open", () => {
    let creds = new SpotifyCredential({
        access_token: secrets.spotify.access_token,
        refresh_token: secrets.spotify.refresh_token,
        client_id: secrets.spotify.client_id,
        client_secret: secrets.spotify.client_secret
    });

    creds.save((err) => {
        connection.close();
        if (err) throw err;
        console.log("Successfully added creds to database");
        process.exit(0);
    });
});