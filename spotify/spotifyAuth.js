const axios = require('axios');
const props = require('../resources/appProperties');
const creds = require('../resources/credentials');
const queryString = require('querystring');

let refreshToken = () => {
    console.log("Refreshing Spotify Token...");
    let formData = queryString.stringify({
        "grant_type": "client_credentials",
        "refresh_token": creds.dev.spotify.refresh_token
    });

    axios({
        method: 'post',
        url: props.urls.SPOTIFY_TOKEN,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer(creds.dev.spotify.client_id + ':' + creds.dev.spotify.client_secret).toString('base64'))
        },
        data: formData
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    });
};

module.exports = {
    refreshToken: refreshToken
};