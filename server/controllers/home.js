const searchService = require('../services/spotifySearchService');
const playlistService = require('../services/spotifyPlaylistService');
const playlistModel = require('../models/playlistModel');

let index = (req, res) => {
    res.render('home', { name: req.session.name, active: { home: true } });
};

let getLogin = (req, res) => {
    res.render('login', { layout: 'loginLayout', active: { login: true } });
};

let postLogin = (req, res) => {
    req.session.name = req.body.name;
    res.redirect('/');
};

let playlist = async (req, res) => {
    let data = await playlistModel.getTracksInPlaylist();
    res.render('playlist', { active: { playlist: true}, data: data.tracks });
};

let search =  (req, res) => {
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

module.exports = {
    index: index,
    getLogin: getLogin,
    postLogin: postLogin,
    playlist: playlist,
    search: search,
    postSearch: postSearch,
    addToPlaylist: addToPlaylist
};