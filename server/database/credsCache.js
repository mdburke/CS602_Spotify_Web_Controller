// Class used for pulling the creds from the db at startup and then caching them in memory so we don't
// need to make a db call every time.
const authDbUtil = require('../models/spotifyCredentialModel');
const secrets = require('../../resources/secrets');

// Globals seem the easiest way to handle this for now. TODO: Don't use globals
global.accessToken = null;
global.refreshToken = null;
global.client_id = secrets.dev.spotify.client_id;
global.client_secret = secrets.dev.spotify.client_secret;
global.user_id = secrets.dev.spotify.user_id;
global.playlist_id = secrets.dev.spotify.playlist_id;

let populate = () => {
    return new Promise(
        (fulfill, reject) => {
            authDbUtil.getAccessToken()
                .then(token => {
                    global.accessToken = token;
                    return authDbUtil.getRefreshToken();
                })
                .then(token => {
                    global.refreshToken = token;
                    fulfill(token);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        }
    );
};

module.exports = {
    populate: populate
};