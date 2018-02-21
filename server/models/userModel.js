const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    trackSchema = require('./trackSchema'),
    dbConnector = require('../database/dbConnector');
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});

let getModel = (connection) => {
    return dbConnector.getModel(userSchema, "users", connection);
};

module.exports = {
    getModel: getModel()
};