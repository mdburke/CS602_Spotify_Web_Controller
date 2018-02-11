// Imports
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const spotifyAuth = require('./spotify/spotifyAuth');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
// We should hold the secrets some place else, but for now this is ok...
const secrets = require('./resources/secrets');

const app = express();

// Setup handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'mainLayout'}));
app.set('view engine', 'handlebars');

// Static resources
app.use(express.static(__dirname + '/public'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookies
app.use(cookieParser());
app.use(expressSession({
    secret: secrets.dev.cookie_secret,
    resave: false,
    saveUninitialized: false}));

// Routing
const routes = require('./routes');
app.use('/', routes);

// Catch-all 404.handlebars error page
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
    spotifyAuth.refreshToken();
});

