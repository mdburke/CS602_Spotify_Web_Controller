const
    axios = require('axios'),
    props = require('../../resources/appProperties'),
    creds = require('../../resources/secrets'),
    credsCache = require('../database/credsCache'),
    queryString = require('querystring'),
    authDbUtil = require('../models/spotifyCredentialModel');

// Only necessary for testing/dev to get new scopes
let getNewRefreshAndAccessToken = async () => {
    console.log("Getting new tokens...");
    return axios({
        method: 'get',
        url: props.urls.SPOTIFY_AUTHORIZE + '?' +
            `client_id=${client_id}` +
            '&response_type=code' +
            '&redirect_uri=' + encodeURIComponent("http://localhost:3000/callback") +
            '&' + props.scopes.default
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
};

// Call Spotify Refresh Token API to obtain new Access Token
let refreshAccessToken = async () => {
    console.log("Refreshing Spotify Token...");
    let requestBody = queryString.stringify({
        "grant_type": "refresh_token",
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
        console.log(res);
        await authDbUtil.updateAccessToken(res.data.access_token);
        await credsCache.populate().then(creds => {
            console.log('Credentials cache has been populated in local memory');
        })
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
    refreshAccessToken: refreshAccessToken,
    getNewRefreshAndAccessToken: getNewRefreshAndAccessToken
};

