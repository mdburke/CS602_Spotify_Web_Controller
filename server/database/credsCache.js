// Class used for pulling the creds from the db at startup and then caching them in memory so we don't
// need to make a db call every time.
const authDbUtil = require('./authDbUtil');
const secrets = require('../resources/secrets');
let accessToken = null;
let refreshToken = null;
let client_id = secrets.dev.spotify.client_id;
let client_secret = secrets.dev.spotify.client_secret;

let populate = () => {
    return new Promise(
        (fulfill, reject) => {
            authDbUtil.getAccessToken()
                .then(token => {
                    accessToken = token;
                    return authDbUtil.getRefreshToken();
                })
                .then(token => {
                    refreshToken = token;
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
    populate: populate,
    getAccessToken: accessToken,
    getRefreshToken: refreshToken,
    getClientId: client_id,
    getClientSecret: client_secret
};