// Imports
const axios = require('axios');
const props = require('../../resources/appProperties');
const creds = require('../../resources/secrets');
const queryString = require('querystring');
const authDbUtil = require('../models/spotifyCredentialModel');

// Only necessary for testing/dev to get new scopes
let getNewRefreshAndAccessToken = async () => {

};


// Call Spotify Refresh Token API to obtain new Access Token
let refreshAccessToken = async () => {
    console.log("Refreshing Spotify Token...");
    let requestBody = queryString.stringify({
        "grant_type": "client_credentials",
        "refresh_token": creds.dev.spotify.refresh_token
    });

    let requestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + getBase64EncodedIdAndSecret()
    };

    return axios({
        method: 'post',
        url: props.urls.SPOTIFY_TOKEN,
        headers: requestHeaders,
        data: requestBody
    }).then(async res => {
        await authDbUtil.updateAccessToken(res.data.access_token);
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    });
};

// Helper methods
let getBase64EncodedIdAndSecret = () => {
    return (new Buffer(creds.dev.spotify.client_id + ':' + creds.dev.spotify.client_secret).toString('base64'));
};

// Exports
module.exports = {
    refreshAccessToken: refreshAccessToken
};

