// Imports
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const spotifyAuth = require('./spotify/spotifyAuth');

const app = express();

// Setup handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Static resources
app.use(express.static(__dirname + '/public'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
const routes = require('./routes');
app.use('/', routes);

// Catch-all 404 error page
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
    spotifyAuth.refreshToken();
});

