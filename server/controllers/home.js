const searchService = require('../services/spotifySearchService'),
    playlistService = require('../services/spotifyPlaylistService'),
    playlistModel = require('../models/playlistModel'),
    playerService = require('../services/spotifyPlayerService'),
    secrets = require('../../resources/secrets');

let index = async (req, res) => {
    res.render('home', { name: req.session.name, active: { home: true }});
};

let nowPlaying = async (req, res) => {
    let playing = JSON.parse(await playerService.getCurrentlyPlaying());
    let title = playing['item']['name'];
    let artist = playing['item']['artists'][0]['name'];
    let isJukebox = isJukeboxPlaylist(playing['context']['uri']);
    res.render('nowPlaying', {
        active: { nowPlaying: true },
        playing: {
            isJukeboxPlaylist: isJukebox,
            title: title,
            artist: artist
        }
    });
};

let getLogin = (req, res) => {
    res.render('login', { layout: 'loginLayout', active: { login: true } });
};

let postLogin = (req, res) => {
    req.session.name = req.body.name;
    res.redirect('/');
};

let getPlaylist = async (req, res) => {
    let data = await playlistModel.getTracksInPlaylist();
    let playing = JSON.parse(await playerService.getCurrentlyPlaying());
    let current = null;
    let tracks = null;

    // Right now this only works if each track is in playlist ONCE. We need a better solution to solve
    // the same track being in the playlist multiple times. We will need to hold the history/recently played
    // in the DB and sync before calls. If out of sync, we'll return null as something has gone wrong.
    if (data !== null && isJukeboxPlaylist(playing['context']['uri'])) {
        tracks = data['tracks'];
        for (let i = 0; i < data.tracks.length; i++) {
            if (tracks[i]['trackUri'] === playing['item']['uri']) {
                current = i;
                tracks[i]['isCurrentlyPlaying'] = true;
                break;
            }
        }
    }


    res.render('playlist', {
        active: { playlist: true },
        data: tracks,
        current: 'test'
    });
};

let getSearch =  (req, res) => {
    res.render('search', { active: { search: true }});
};

let postSearch = async (req, res) => {
    let query = req.body.query;
    let results = JSON.parse(await searchService.search(query, 'track'));
    let items = results.tracks.items;
    let data = items.map(item => {
        return {
            title: item.name,
            artist: item["artists"][0].name,
            imageUri: item.album["images"][0].url,
            album: item.album.name,
            trackUri: item.uri,
            artistUri: item["artists"][0].uri,
            user: req.session.name
        }
    });

    res.render('search', {
        active: { search: true },
        data: data
    });
};

let addToPlaylist = async (req, res) => {
    const track = {
        title: req.body.title,
        artist: req.body.artist,
        imageUri: req.body.imageUri,
        album: req.body.album,
        trackUri: req.body.trackUri,
        artistUri: req.body.artistUri,
        user: req.session.name
    };
    // TODO: Validate param based on regex to match spotify uri format
    await playlistService.addTrackToPlaylist(
        global.user_id,
        global.playlist_id,
        [track]                                 // Array for future use case of adding multiple tracks
    );

    res.redirect('/playlist');
};

let isJukeboxPlaylist = (contextUri) => {
    return contextUri === 'spotify:user:' + secrets.dev.spotify.user_id + ':playlist:' + secrets.dev.spotify.playlist_id;
};

module.exports = {
    index: index,
    getLogin: getLogin,
    postLogin: postLogin,
    playlist: getPlaylist,
    search: getSearch,
    postSearch: postSearch,
    addToPlaylist: addToPlaylist,
    nowPlaying: nowPlaying
};