const mongoose = require('mongoose'),
    creds = require("../../resources/secrets"),
    dbUrl = 'mongodb://' + creds.dev.username +
        ':' + creds.dev.password + '@' + creds.dev.host + ':' + creds.dev.port + '/' + creds.dev.database;

let getConnection = () => {
    // TODO: Investigate: Create a connection pool to reuse connections?
    console.log("Get connection called");
    return mongoose.createConnection(dbUrl);
};

let getModel = (schema, name, connection = null) => {
    console.log("Get model called");
    let model;
    if (connection === null || connection === undefined) {
        connection = getConnection();
        model = connection.model(name, schema);
    }
    return model;
}

module.exports = {
    getConnection: getConnection,
    getModel: getModel
};