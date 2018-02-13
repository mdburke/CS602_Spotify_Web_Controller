const credsModel = require('../models/spotifyCredentialModel');
const credsService = require('./spotifyCredentialService');
const props = require('../../resources/appProperties');
const queryString = require('querystring');
const axios = require('axios');

let search = (query, type) => {
    console.log("Calling Spotify search API...");

    let queryParams = queryString.encode({
        q: query,
        type: type
    });

    let requestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Bearer " + global.accessToken
    };

    axios({
        method: 'get',
        url: props.urls.SPOTIFY_SEARCH + '?' + queryParams,
        headers: requestHeaders
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    })
};

module.exports = {
    search: search
};