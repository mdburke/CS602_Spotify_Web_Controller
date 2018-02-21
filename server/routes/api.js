const
    express = require('express'),
    apiController = require('../controllers/api');

let router = express.Router();

router.get('/playlist', apiController.getPlaylist);
router.get('/playlist/tracks', apiController.getTracks);
router.get('/users/:user/history'), apiController.getHistoryByUser);

module.exports = router;