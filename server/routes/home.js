const
    express = require('express'),
    homeController = require('../controllers/home');

let router = express.Router();

router.get('/', homeController.index);
router.get('/login', homeController.getLogin);
router.post('/login', homeController.postLogin);
router.get('/playlist', homeController.playlist);
router.get('/search', homeController.search);

module.exports = router;