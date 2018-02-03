const express = require('express');
const router = express.Router();

// Router specs
// Home
router.get('/', (req, res, next) => {
    res.render('home', { subtitle: 'Home' });
});

module.exports = router;