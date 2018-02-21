const
    credsService = require('./spotifyCredentialService'),
    props = require('../../resources/appProperties'),
    playlistModel = require('../models/playlistModel'),
    rp = require('request-promise');

let getPlaylist = async (user_id, playlist_id) => {
    console.log(`Calling Spotify get playlist API with user_id ${user_id} and playlist_id ${playlist_id}`);
    let response;
    try {
        response = await rp(buildGetRequestOptions(user_id, playlist_id));
    } catch (error) {
        if (error.statusCode === 401) {
            await credsService.refreshAccessToken();
            response = await rp(buildGetRequestOptions(user_id, playlist_id));
        }
    }

    return response;
};

let addTrackToPlaylist = async (user_id, playlist_id, track) => {
    console.log(`Calling Spotify post playlist API with user_id ${user_id} and playlist_id ${playlist_id}`);
    let response;
    let currentTrack = track[0];

    // TODO: Make the following few actions atomic if somehow possible?

    // Add track to playlist in Spotify
    try {
        response = await rp(buildPostRequestOptions(user_id, playlist_id, [currentTrack.trackUri]));
    } catch (error) {
        if (error.statusCode === 401) {
            await credsService.refreshAccessToken();
            response = await rp(buildPostRequestOptions(user_id, playlist_id, [currentTrack.trackUri]));
        } else {
            console.log(error);
        }
    }

    // Add track to database playlist
    playlistModel.addToPlaylist(currentTrack);

    return response;
};

// Helper methods
let buildGetRequestOptions = (user_id, playlist_id) => {
    let requestHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + global.accessToken
    };

    return {
        method: 'GET',
        uri: props.urls.SPOTIFY_API + `/users/${user_id}/playlists/${playlist_id}`,
        headers: requestHeaders
    }
};


// Helper methods
let buildPostRequestOptions = (user_id, playlist_id, uris) => {
    let requestHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + global.accessToken
    };

    let uriString = '';

    for (let i = 0; i < uris.length; i++) {
        if (i === uris.length - 1) {
            uriString += uris[i];
        } else {
            uriString += uris[i] + ',';
        }
    }

    return {
        method: 'POST',
        uri: props.urls.SPOTIFY_API + `/users/${user_id}/playlists/${playlist_id}/tracks?uris=${encodeURIComponent(uriString)}`,
        headers: requestHeaders
    }
};

module.exports = {
    getPlaylist: getPlaylist,
    addTrackToPlaylist: addTrackToPlaylist
};