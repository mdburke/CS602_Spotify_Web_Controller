const
    credsService = require('./spotifyCredentialService'),
    props = require('../../resources/appProperties'),
    rp = require('request-promise');

let getCurrentlyPlaying = async () => {
    console.log(`Calling Spotify current track API`);
    let response;
    try {
        response = await rp(buildRequest());
    } catch (error) {
        if (error.statusCode === 401) {
            await credsService.refreshAccessToken();
            response = await rp(buildRequest());
        } else {
            console.log(error);
            response = error;
        }
    }

    return response;
};

let buildRequest = () => {
    return {
        method: 'GET',
        uri: props.urls.SPOTIFY_PLAYER + '/currently-playing',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + global.accessToken
        }
    }
};

module.exports = {
    getCurrentlyPlaying: getCurrentlyPlaying
};