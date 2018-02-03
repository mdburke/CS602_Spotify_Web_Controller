const mongoose = require('mongoose');

const creds = require("../resources/secrets");
const dbUrl = 'mongodb://' + creds.dev.username +
    ':' + creds.dev.password + '@' + creds.dev.host + ':' + creds.dev.port + '/' + creds.dev.database;

// Returns a mongodb connection with creds from secrets.js
module.exports = {
    getConnection: () => {
        console.log(dbUrl);
        return mongoose.createConnection(dbUrl);
    }
};