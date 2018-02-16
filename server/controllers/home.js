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
    let name = req.body.name;
    req.session.name = name;
    res.redirect('/');
};

let playlist = (req, res) => {
    res.render('playlist', { active: { playlist: true } });
};

let search = async (req, res) => {
    let data = JSON.parse(await searchService.search('Roadhouse Blues', 'album'));
    let albums = data["albums"]["items"];
    console.log(albums);
    res.render('search', { active: { search: true }, data: albums });
};

let postSearch = (req, res) => {

};

module.exports = {
    index: index,
    getLogin: getLogin,
    postLogin: postLogin,
    playlist: playlist,
    search: search
};