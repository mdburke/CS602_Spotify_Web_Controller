const credsModel = require('../models/spotifyCredentialModel');
const credsService = require('./spotifyCredentialService');
const props = require('../../resources/appProperties');
const queryString = require('querystring');
const axios = require('axios');
const rp = require('request-promise');
const request = require('request');

let search = async (query, type) => {
    console.log("Calling Spotify search API...");

    let queryParams = queryString.encode({
        q: query,
        type: type
    });

    let requestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Bearer " + global.accessToken
    };

    let response;
    let options = {
        method: 'GET',
        uri: props.urls.SPOTIFY_SEARCH + '?' + queryParams,
        headers: requestHeaders
    };
    try {
        response = await rp(options);
        // console.log(response);
    } catch (error) {
        console.log(error);
    }

    return response;

    // const makeRequest = async () => {
    //     let response;
    //     let options = {
    //         method: 'GET',
    //         uri: props.urls.SPOTIFY_SEARCH + '?' + queryParams,
    //         headers: requestHeaders
    //     };
    //     // try {
    //         response = await rp(options);
    //
    //         console.log(response.statusCode);
    //
    //     // } catch (err) {
    //     //     console.log(err);
    //         if (response.statusCode === 401) {
    //             console.log("called refresh");
    //             await credsService.refreshAccessToken();
    //             response = await rp(options);
    //             console.log(response.statusCode);
    //         }
    //     // }
    // };
    //
    // makeRequest();
};

module.exports = {
    search: search
};