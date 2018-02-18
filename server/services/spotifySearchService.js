const credsService = require('./spotifyCredentialService');
const props = require('../../resources/appProperties');
const queryString = require('querystring');
const rp = require('request-promise');

let search = async (query, type) => {
    let queryParams = queryString.encode({
        q: query,
        type: type
    });

    let requestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Bearer " + global.accessToken
    };

    console.log(`Calling Spotify search API with query ${query} and type ${type}`);

    let response;
    let options = {
        method: 'GET',
        uri: props.urls.SPOTIFY_SEARCH + '?' + queryParams,
        headers: requestHeaders
    };
    try {
        response = await rp(options);
    } catch (error) {
        if (error.statusCode === 401) {
            await credsService.refreshAccessToken();
            response = await rp(options);
        }
    }

    return response;
};

module.exports = {
    search: search
};