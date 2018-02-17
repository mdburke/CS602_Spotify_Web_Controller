const
    express = require('express'),
    homeController = require('../controllers/home');

let router = express.Router();

router.get('/', homeController.index);
router.get('/login', homeController.getLogin);
router.post('/login', homeController.postLogin);
router.get('/playlist', homeController.playlist);
router.get('/search', homeController.search);
router.post('/search', homeController.postSearch);

// Temp for testing - yes I know I should write tests instead
router.get('/refresh', (req, res, next) => {
    console.log(require('../services/spotifyCredentialService').refreshAccessToken());
    next();
});

router.get('/searchTest', (req, res, next) => {
    require('../services/spotifySearchService').search('Roadhouse Blues', 'album');
    next();
});

module.exports = router;