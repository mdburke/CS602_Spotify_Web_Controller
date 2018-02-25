// Only used to initialize the database with the creds/etc. when first created
const
    connection = require('./dbConnector').getConnection(),
    SpotifyCredential = require('../models/spotifyCredentialModel').getModel,
    PlaylistSchema = require('../models/playlistModel').getModel,
    secrets = require('../../resources/secrets').dev;


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


    let playlists = new PlaylistSchema({
        playlist_id: secrets.spotify.playlist_id,
        user_id: secrets.spotify.user_id,
        tracks: []
    });

    playlists.save(err => {
        connection.close();
        if (err) throw err;
        console.log("Successfully added playlist doc to database");
        process.exit(0);
    });
});