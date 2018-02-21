const
    express = require('express'),
    apiController = require('../controllers/api');

let router = express.Router();

router.get('/playlist', apiController.getPlaylist);
router.get('/playlist/tracks', apiController.getTracks);

module.exports = router;