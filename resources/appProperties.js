module.exports = {
    urls: {
        SPOTIFY_API: 'https://api.spotify.com/v1',
        SPOTIFY_AUTHORIZE: 'https://accounts.spotify.com/authorize',
        SPOTIFY_TOKEN: 'https://accounts.spotify.com/api/token',
        SPOTIFY_SEARCH: 'https://api.spotify.com/v1/search',
        SPOTIFY_PLAYER: 'https://api.spotify.com/v1/me/player'
    },
    scopes: {
        default: 'scope=' +
            'user-read-private%20' +
            'user-read-email%20' +
            'playlist-modify-public%20' +
            'playlist-read-private%20' +
            'playlist-modify-private%20' +
            'user-read-playback-state%20' +
            'user-modify-playback-state%20' +
            'user-read-currently-playing%20' +
            'ugc-image-upload%20'
    }
};