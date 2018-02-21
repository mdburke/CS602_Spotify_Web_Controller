const
    express = require('express'),
    homeController = require('../controllers/home');

let router = express.Router();

router.get('/', isLoggedIn, homeController.index);
router.get('/login', homeController.getLogin);
router.post('/login', homeController.postLogin);
router.get('/playlist', isLoggedIn, homeController.playlist);
router.post('/playlist', isLoggedIn, homeController.addToPlaylist);
router.get('/search', isLoggedIn, homeController.search);
router.post('/search', isLoggedIn, homeController.postSearch);

// Temp for testing - yes I know I should write tests instead
router.get('/refresh', (req, res, next) => {
    console.log(require('../services/spotifyCredentialService').refreshAccessToken());
    next();
});

router.get('/searchTest', (req, res, next) => {
    require('../services/spotifySearchService').search('Roadhouse Blues', 'album');
    next();
});

router.get('/newTokens', (req, res, next) => {
    require('../services/spotifyCredentialService').getNewRefreshAndAccessToken();
    next();
});

router.get('/addTest', (req, res, next) => {
    require('../services/spotifyPlaylistService')
        .addTrackToPlaylist(global.user_id,
            global.playlist_id,
            ['spotify:track:6b2oQwSGFkzsMtQruIWm2p', 'spotify:track:3SVAN3BRByDmHOhKyIDxfC']
    ).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    next();
});

router.get('/testAddToPlaylist', (req, res, next) => {
    require('../models/playlistModel').addToPlaylist(
        {
            title: "testTitle",
            artist: "artist",
            imageUri: "image",
            album: "album",
            trackUri: "trackUri",
            artistUri: "artistUri",
            name: "name"
        }
    ).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    next();
});

function isLoggedIn(req, res, next) {
    if (!req.session.name) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = router;