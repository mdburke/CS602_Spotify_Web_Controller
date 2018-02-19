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
            '&redirect_uri=' + queryString.stringify("http://localhost:3000/callback") +
            '&scope=' +
                'user-read-private%20' +
                'user-read-email%20' +
                'playlist-read-private%20' +
                'playlist-modify-private%20' +
                'user-read-playback-state%20' +
                'user-modify-playback-state%20' +
                'user-read-currently-playing%20' +
                'ugc-image-upload%20'
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

