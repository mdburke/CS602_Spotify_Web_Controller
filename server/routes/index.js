const
    // apiRoute = require('./apis'),
    homeRoute = require('./home');

let init = (server) => {
    // Log the request
    server.get('*', (req, res, next) => {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    // server.use('/api', apiRoute);
    server.use('/', homeRoute);

    server.use((req, res) => {
        res.status(404);
        res.render('404');
    });
};

module.exports = {
    init: init
};