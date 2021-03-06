const
    express = require('express'),
    bodyParser = require('body-parser'),
    handlebars = require('express-handlebars'),
    expressSession = require('express-session'),
    // We should hold/encrypt the secrets some place else, but for now this is ok...
    secrets = require('../resources/secrets');

module.exports = () => {
    let server = express(),
        credsCache,
        create,
        start;

    create = (config) => {
        let routes = require('./routes');

        // Load config
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('views', config.viewDir);

        // Setup bodyParser
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));

        // Setup handlebars view engine
        server.engine('handlebars', handlebars({defaultLayout: 'mainLayout'}));
        server.set('view engine', 'handlebars');

        // Static resources
        server.use(express.static('public'));

        // Setup Cookies
        server.use(expressSession({
            secret: secrets.dev.cookie_secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24         // One day in ms
            }
        }));

        // Setup routes
        routes.init(server);
    };

    credsCache = require('./database/credsCache');

    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');

        // We need to load creds in memory before we start listening for requests
        credsCache.populate().then(creds => {
            console.log('Credentials cache has been populated in local memory');

            server.listen(port, () => {
                console.log('Express server listening on - http://' + hostname + ':' + port);
            });
        })
    };

    return {
        server: server,
        create: create,
        start: start,
        credsCache: credsCache
    }
};