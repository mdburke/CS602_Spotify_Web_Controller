const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dbConnector = require('../database/dbConnector');
mongoose.Promise = global.Promise;

// To be used for more advanced applications. P1 is just "add" so we don't need a separate document, we can associate
// the user to the track directly.
const historySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, enum: ['Add', 'Remove']}, // TODO: Add 'Edit' for order changes. Currently out of scope.
    track: { type: Schema.Types.ObjectId, ref: 'Track' }
    // TODO: These will only be used for order changes ('Edit'), which is probably out of scope for now.
    // startPlacement: Number,
    // endPlacement: Number
});

let getModel = (connection) => {
    return dbConnector.getModel(historySchema, "history", connection);
};

module.exports = {
    getModel: getModel()
};