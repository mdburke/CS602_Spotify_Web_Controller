const express = require('express');
const router = express.Router();

// Router specs
// Home
router.get('/', (req, res, next) => {
    if (!req.session.name) {
        res.redirect('login');
    } else {
        res.render('home', { subtitle: 'Now Playing', name: req.session.name });
    }
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    let name = req.body.name;
    req.session.name = name;
    res.redirect('/');
});


module.exports = router;