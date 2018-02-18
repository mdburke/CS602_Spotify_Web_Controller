const searchService = require('../services/spotifySearchService');

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

module.exports = {
    index: index,
    getLogin: getLogin,
    postLogin: postLogin,
    playlist: playlist,
    search: search,
    postSearch: postSearch
};