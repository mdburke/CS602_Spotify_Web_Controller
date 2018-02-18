const
    credsService = require('./spotifyCredentialService'),
    props = require('../../resources/appProperties'),
    queryString = require('querystring'),
    rp = require('request-promise');

let search = async (query, type) => {
    console.log(`Calling Spotify search API with query ${query} and type ${type}`);
    let response;
    try {
        response = await rp(buildRequestOptions(query, type));
    } catch (error) {
        if (error.statusCode === 401) {
            await credsService.refreshAccessToken();
            response = await rp(buildRequestOptions(query, type));
        }
    }

    return response;
};

// Helper methods
let buildRequestOptions = (query, type) => {
    let queryParams = queryString.encode({
        q: query,
        type: type
    });

    let requestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Bearer " + global.accessToken
    };

    return {
        method: 'GET',
        uri: props.urls.SPOTIFY_SEARCH + '?' + queryParams,
        headers: requestHeaders
    }
};

module.exports = {
    search: search
};