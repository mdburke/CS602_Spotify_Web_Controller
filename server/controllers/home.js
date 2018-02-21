const searchService = require('../services/spotifySearchService');
const playlistService = require('../services/spotifyPlaylistService');

let index = (req, res) => {
    if (!req.session.name) {
        res.redirect('/login');
    } else {
        res.render('home', { name: req.session.name, active: { home: true } });
    }
};

let getLogin = (req, res) => {
    res.render('login', { layout: 'loginLayout', active: { login: true } });
};

let postLogin = (req, res) => {
    req.session.name = req.body.name;
    res.redirect('/');
};

let playlist = (req, res) => {
    res.render('playlist', { active: { playlist: true } });
};

let search =  (req, res) => {
    res.render('search', { active: { search: true}});
};

let postSearch = async (req, res) => {
    let query = req.body.query;
    let results = JSON.parse(await searchService.search(query, 'track'));
    let data = results.tracks.items;

    res.render('search', {
        active: { search: true },
        data: data
    });
};

let addToPlaylist = async (req, res) => {
    // TODO: Validate param based on regex?
    const uri = req.body.uri;
    await playlistService.addTrackToPlaylist(
        global.user_id,
        global.playlist_id,
        [uri]
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