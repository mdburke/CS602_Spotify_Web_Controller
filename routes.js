const express = require('express');
const router = express.Router();

// Router specs
// Home
router.get('/', (req, res, next) => {
    if (!req.session.name) {
        res.redirect('login');
    } else {
        res.render('home', { name: req.session.name, active: { home: true } });
    }
});

// Login
router.get('/login', (req, res, next) => {
    res.render('login', { layout: 'loginLayout', active: { login: true } });
});
router.post('/login', (req, res, next) => {
    let name = req.body.name;
    req.session.name = name;
    res.redirect('/');
});

// Playlist
router.get('/playlist', (req, res, next) => {
    res.render('playlist', { active: { playlist: true } });
});

// Search
router.get('/search', (req, res, next) => {
    res.render('search', { active: { search: true } });
});


module.exports = router;